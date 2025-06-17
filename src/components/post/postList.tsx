import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PostWithData } from '@/lib/query';
import Link from 'next/link';

type PostListProps = {
  fetchData?: () => Promise<PostWithData[]>;
};

async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData?.();
  if (!posts) {
    return <h1 className="text-center text-red-500 mt-10">Something went wrong</h1>;
  }

  return (
    <div className="flex flex-col gap-4 w-3/4 mx-10 mt-8">
      {posts.map((post) => (
        <Link key={post.id} href={`/topics/${post.topic.slug}/posts/${post.id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>By {post.user?.name}</span>
                <span>{post._count.comments} comments</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
