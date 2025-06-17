"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Post } from "@prisma/client";

// Zod schema for validation
const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }),
});

// Type for form state error
type CreatePostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
    formerror?: string[];
  };
};

// Server action
export const createPost = async (
  slug: string,
  prevState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const title = formData.get("title");
  const content = formData.get("content");

  // Validate types
  if (typeof title !== "string" || typeof content !== "string") {
    return {
      errors: {
        formerror: ["Invalid form submission"],
      },
    };
  }

  // Validate input
  const result = createPostSchema.safeParse({ title, content });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check authentication
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        formerror: ["You must be logged in to create a post"],
      },
    };
  }

  // Check topic existence
  const topic = await prisma.topic.findUnique({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        formerror: ["Topic not found"],
      },
    };
  }

  // Create post
  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formerror: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formerror: ["An unexpected error occurred"],
        },
      };
    }
  }

  // Invalidate cache and redirect
  revalidatePath(`/topics/${slug}`);
  redirect(`/topics/${slug}/posts/${post.id}`);
};
