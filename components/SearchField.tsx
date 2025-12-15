'use client';
import { useSearch } from '@/context/SearchContext';
import { Search, X } from 'lucide-react';


export default function SearchField() {
  const { searchTerm, onUpdateSearchTerm } = useSearch();
  return (
    <section className='relative w-full my-6 md:w-3xl'>
      <Search className='absolute w-5 h-5 top-2.5 left-2.5 text-gray-400' />
      <input
        type='text'
        className='w-full pl-10 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-full transition duration-300 ease hover:border-slate-300 shadow-sm'
        placeholder='Search here...'
        value={searchTerm}
        onChange={(e) => onUpdateSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <X
          onClick={() => onUpdateSearchTerm('')}
          className='absolute w-5 h-5 top-2.5 right-2.5 text-slate-600 cursor-pointer'
        />
      )}
    </section>
  );
}
