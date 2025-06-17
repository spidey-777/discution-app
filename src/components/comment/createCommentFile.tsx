'use client'
import React, { useActionState, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createComment } from '@/actions/create-comment'
import { Loader2 } from 'lucide-react'

type CreateCommentFileProps = {
    postId: string
    perentId?: string
    startOpen?: boolean
}

function CreateCommentFile({postId, perentId, startOpen}: CreateCommentFileProps) {
  const [open, setOpen] = useState(startOpen)
  const [formState,action,isPending] = useActionState(createComment.bind(null,{postId,perentId}),{errors:{}})
  //console.log(postId,perentId);
  return (
    <div className='mx-10 '>
        <Button size="sm" variant={'link'} onClick={()=> setOpen(!open)}  >
            Reply
        </Button>
        {
            open &&
            <form action={action}>
            <Textarea
            placeholder='Write a comment...'
            className='w-1/4 mt-2 bg-gray-50 focus-visible:ring-0'
            name='content'
            />
            {
                formState.errors?.content && (
                    <p className='text-red-500 text-sm p-1 rounded'>
                        {formState.errors.content[0]}
                    </p>
                )
            }
            {
                formState.errors?.formerror && (
                    <div className='bg-red-500 text-white text-sm div-1 rounded'>
                        {formState.errors.formerror[0]}
                    </div>
                )
            }
            <Button disabled={isPending} variant={'secondary'} size={'sm'} className='mt-2'>
                {
                    isPending ?
                    (<>
                    <Loader2/>
                    Please wait...
                    </>):
                  "submit" 
                }
            </Button>
        </form>
        }
        
    </div>
  )
}

export default CreateCommentFile