'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createCommentSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' })
})

type CreateCommentState = {
  errors: {
    content?: string[]
    formerror?: string[]
  }
}

export const createComment = async (
  { postId, perentId }: { postId: string; perentId?: string },
  prevState: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> => {
  const content = formData.get('content')

  // ✅ Fix 1: Return the error here, you missed `return`
  const result = createCommentSchema.safeParse({ content })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  // ✅ Session Check
  const session = await auth()
  if (!session?.user?.id) {
    return {
      errors: {
        formerror: ['You must be logged in to create a comment']
      }
    }
  }

  if (typeof content !== 'string') {
    return {
      errors: {
        formerror: ['Invalid form submission']
      }
    }
  }

  // ✅ Create comment
  try {
    await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        postId,
        parentId: perentId ?? null
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formerror: [error.message]
        }
      }
    } else {
      return {
        errors: {
          formerror: ['An unexpected error occurred']
        }
      }
    }
  }

  // ✅ Get topic.slug from post
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { topic: true }
  })

  if (!post?.topic) {
    return {
      errors: {
        formerror: ['Failed to revalidate path']
      }
    }
  }

  // ✅ Fix typo: revelidatePath → revalidatePath
  revalidatePath(`/topics/${post.topic.slug}/posts/${postId}`)

  return {
    errors: {}
  }
}
