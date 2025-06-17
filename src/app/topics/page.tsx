import TopicCreateFile from '@/components/topic/topicCreateFile'
import TopicList from '@/components/topic/topicList'
import React from 'react'

function page() {
  return (
   <div className="grid grid-cols-4 h-screen">
  <div className="col-span-3 mx-10 overflow-y-auto h-full">
    <TopicList />
  </div>
  <div className="mt-10 overflow-y-auto h-full">
    <TopicCreateFile />
  </div>
</div>

  )
}

export default page