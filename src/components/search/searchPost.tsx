"use client"
import React from 'react'
import { Input } from '../ui/input'
import { useSearchParams } from 'next/navigation'
import { search } from '@/actions/search';
import { Button } from '../ui/button';
import { CIcon } from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
function SearchPost() {
    const searchParam = useSearchParams();
  return (
    <form action={search} className='flex items-center gap-2'>  
    <Input 
    placeholder='Search posts...'
    className='w-96 bg-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus:bg-zinc-100 focus:ring-0 focus:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:bg-zinc-700 dark:focus:border-zinc-600'
    defaultValue={searchParam.get('term') || ''}
    name='term'  
    />
    <Button type='submit' className='bg-zinc-300 hover:bg-zinc-400 text-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 cursor-pointer'>
      <CIcon icon={cilSearch} />
    </Button>
    </form>
  )
}

export default SearchPost