"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Topic } from "@prisma/client";

const createTopicSchema = z.object({
  title: z
    .string()
    .min(1)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters with dashes, no spaces",
    }),
  description: z
    .string()
    .min(10, { message: "Description is required and must be long" }),
});

// Type for return state
type CreateTopicFormState = {
  error?: {
    title?: string[];
    description?: string[];
    formerror?: string[];
  };
};

// Server action
export const createTopic = async (
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const result = createTopicSchema.safeParse({ title, description });

  // Return validation errors
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      error: {
        title: errors.title,
        description: errors.description,
      },
    };
  }

  // Check auth
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: {
        formerror: ["You must be logged in to create a topic"],
      },
    };
  }
  const existing = await prisma.topic.findUnique({
  where: { slug: result.data.title },
});

if (existing) {
  return {
    error: {
      title: ["A topic with this title already exists"],
    },
  };
}


  // Save to database
  let topic : Topic ;
   try {
     topic = await prisma.topic.create({
      data: {
        slug: result.data.title,
        description: result.data.description,
      },
    });

    // Refresh home page and redirect to new topic

  } catch (error) {
    if (error instanceof Error) {
      return {
        error: {
          formerror: [error.message],
        },
      };
    } else {
      return {
        error: {
          formerror: ["An unexpected error occurred"],
        },
      };
    }
}

    revalidatePath("/");
    redirect(`/topics/${topic.slug}`);
}
