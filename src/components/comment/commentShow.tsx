import { fetchCommentsByPostId } from '@/lib/commentsquery';
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar';
import CreateCommentFile from './createCommentFile';
type CommentShowProps = {
  postId: string;
  commentId: string;
}
async function CommentShow({ postId, commentId }: CommentShowProps ) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find(comment => comment.id === commentId);
  if (!comment) {
    return <div>Comment not found</div>;
  }
  const childrenComments = comments.filter(c => c.parentId === comment.id);
  console.log(comment.content, comment.user.name, comment.user.image);
  return (
    <div className='m-4 p-4  bg-gray-50'>
      <div className='flex  gap-3  '>
        <Avatar>
          <AvatarImage src={comment.user.image||""}/>
        </Avatar>
          <div className='flex-1 space-y-0.5 '>
            <p className='text-gray-500 text-sm font-medium'> {comment.user.name}</p>
            <p className='text-gray-700 text-lg font-medium'>{comment.content}</p>
            <CreateCommentFile postId={comment.postId} perentId={comment.id} startOpen={false} />
          </div>

      </div>


      {
        childrenComments.map(childComment => <CommentShow key={childComment.id} postId={childComment.postId} commentId={childComment.id} />)
      }
    </div>
  )
}

export default CommentShow