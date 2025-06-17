import { fetchCommentsByPostId } from '@/lib/commentsquery';
import React from 'react'
import CommentShow from './commentShow';

type CommentListProps = {   
    postId: string;
    }
async function CommentList( { postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);
  const TopLevelComment = comments.filter(comment => comment.parentId === null);
  const commentCount = comments.length;
  return (
    <div className='mx-10 mt-4'>
      <h1 className='font-bold text-lg'>All {commentCount} Comments</h1 >
      {
        TopLevelComment.map(comment =><CommentShow key={comment.id} postId ={comment.postId} commentId = {comment.id} />)
      } 

    </div>
  )
}

export default CommentList