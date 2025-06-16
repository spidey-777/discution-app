import TopicCreateFile from "@/components/topic/topicCreateFile";


export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 ">
      <div className="col-span-3 bg-gray-200 p-4 rounded">
        <h1>hii</h1>
      </div>
      <div className="col-span-1 bg-gray-100 p-4 rounded">
       <TopicCreateFile/>
        </div>
    </div>
  );
}
