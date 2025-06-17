import CommentList from '@/components/comment/commentList';
import CreateCommentFile from '@/components/comment/createCommentFile';
import PostShow from '@/components/post/post-show';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'

type SinglePostPageProps = {
    params: Promise<{  
        slug: string;
        postid: string;
    }>

}

async function SinglePostPage({params}: SinglePostPageProps) {
    const { slug, postid } = await params;

  return (
    <div>
        <Link href={`/topics/${slug}`} className='flex items-center '>
        <Button variant={'link'}>
            <ChevronLeft/>
            Back to {slug}
        </Button>
        </Link>
        <Suspense fallback={<p>loading...</p>}>
    <PostShow postId={postid} />
        </Suspense>
    <CreateCommentFile postId={postid} startOpen= {false}/>
    <CommentList postId ={postid}/>

    </div>
  )
}

export default SinglePostPage