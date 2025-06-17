import { fetchTopics } from "@/lib/topicsquery";
import React from "react";
import ShowTopic from "./showTopic";

async function TopicList() {
  const topics = await fetchTopics();
  console.log(topics);
  return (
    <div>
      {topics.map((topic) => (
        <ShowTopic key={topic.id} {...topic} />
      ))}
    </div>
  );
}

export default TopicList;
