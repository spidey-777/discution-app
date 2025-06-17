import { prisma } from "@/lib";
import { notFound } from "next/navigation";
import React from "react";

type PostShowProps = {
  postId?: string;
};

async function PostShow({ postId }: PostShowProps) {
  if (!postId) notFound(); // don't use `return` here

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-2 mx-10 mt-7">
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <h1 className="w-full max-w-3xl text-lg font-medium border-l-4 border-gray-700 bg-gray-100 p-6 my-6 rounded-md shadow-md leading-relaxed">
        {post.content}
      </h1>
    </div>
  );
}

export default PostShow;
