import React from "react";
import { Topic } from "@prisma/client";
import Link from "next/link";

type showTopicSchima = Topic & {
  _count: {
    posts: number;
  };
};

function ShowTopic({ slug, description,_count }: showTopicSchima) {
  return (
    <Link href={`/topics/${slug}`}>
    <div className="border border-gray-300 rounded-md p-4 my-4 hover:cursor-pointer shadow-sm">
      <h1 className="font-bold text-lg mb-1">{slug}</h1>
      <h1 className="text-sm text-gray-700">{description}</h1>
      <h1 className="text-end"> posts-{_count.posts}</h1>
    </div>
    </Link>
  );
}

export default ShowTopic;
