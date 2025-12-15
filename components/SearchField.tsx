'use client';
import { useSearch } from '@/context/SearchContext';
import { Search, X } from 'lucide-react';


export default function SearchField() {
  const { searchTerm, onUpdateSearchTerm } = useSearch();
  return (
    <section className='my-6 w-full px-5 md:px-0 md:w-3xl'>
      <div className='relative'>
        <Search className='absolute w-5 h-5 top-4 left-3 text-gray-400' />
        <input
          type='text'
          className='w-full pl-10 pr-10 py-4 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-full transition duration-300 ease hover:border-slate-300 shadow-sm'
          placeholder='Search here...'
          value={searchTerm}
          onChange={(e) => onUpdateSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <X
            onClick={() => onUpdateSearchTerm('')}
            className='absolute w-5 h-5 top-4 right-3 text-slate-600 cursor-pointer'
          />
        )}
      </div>
    </section>
  );
}
