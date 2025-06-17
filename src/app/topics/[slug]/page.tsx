import PostCreateFile from "@/components/post/postCreateFile";

import { prisma } from "@/lib";
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
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 ">
        <h1>{slug}</h1>
      </div>
      <div>
        <PostCreateFile slug= {slug}/>
      </div>
    </div>
  );
};

export default TopicsShowPage;
