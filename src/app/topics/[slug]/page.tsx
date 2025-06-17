import PostCreateFile from "@/components/post/postCreateFile";
import PostList from "@/components/post/postList";

import { prisma } from "@/lib";
import { fetchPostByTopicSlug } from "@/lib/query";
import React from "react";

type TopicShowPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
const TopicsShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const topic = await prisma.topic.findUnique({
    where: { slug },
  });

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-5">
      <div className="col-span-3 ">
        <h1 className="font-bold  text-2xl mb-4 mx-11">topic : {slug}</h1>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateFile slug= {slug}/>
      </div>
    </div>
  );
};

export default TopicsShowPage;
