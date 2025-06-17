import PostList from "@/components/post/postList";
import TopicCreateFile from "@/components/topic/topicCreateFile";
import TopicList from "@/components/topic/topicList";
import { fetchTopPosts } from "@/lib/query";


export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 h-screen">
  {/* Left: Top Posts */}
  <div className="col-span-3 bg-gray-200 p-4 rounded overflow-y-auto h-full">
    <h1 className="mx-12 font-bold text-2xl mb-2">Top Posts</h1>
    <PostList fetchData={fetchTopPosts} />
  </div>

  {/* Right: Topics */}
  <div className="col-span-1 bg-gray-100 p-4 rounded overflow-y-auto h-full">
    <TopicCreateFile />
    <h1 className="font-bold text-2xl mb-3 mt-4">Trending Topics :-</h1>
    <TopicList />
  </div>
</div>

  );
}
