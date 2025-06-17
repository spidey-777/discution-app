import PostList from '@/components/post/postList';
import { fetchPostBySearch } from '@/lib/query';
import React from 'react';

type SearchPageProps = {
  searchParams: {
    term?: string;
  };
};

async function SearchPage({ searchParams }: SearchPageProps) {
  const term = searchParams.term ?? '';

  return (
    <div className="text-blue-600 mx-10 mt-6">
      <h1 className="text-xl font-semibold mx-10 mb-4">Search results for {term}</h1>
      <PostList fetchData={() => fetchPostBySearch(term)} />
    </div>
  );
}

export default SearchPage;
