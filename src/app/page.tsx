import PostList from "@/components/post/postList";
import TopicCreateFile from "@/components/topic/topicCreateFile";
import { fetchTopPosts } from "@/lib/query";


export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 ">
      <div className="col-span-3 bg-gray-200 p-4 rounded">
        <h1 className="mx-12 font-bold text-2xl mb-2">top Posts</h1>
        <PostList fetchData={fetchTopPosts }/>
      </div>
      <div className="col-span-1 bg-gray-100 p-4 rounded">
       <TopicCreateFile/>
        </div>
    </div>
  );
}
