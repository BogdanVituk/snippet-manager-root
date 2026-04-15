'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { api } from '../services/snippets'

export default function SearchFilters() {
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => api.getTags(),
  });


  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) params.set('q', term); else params.delete('q');

    params.set('page', '1'); 
    router.push(`?${params.toString()}`);
  }, 300);

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams);

    if (tag) params.set('tag', tag); else params.delete('tag');
    
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        defaultValue={searchParams.get('q')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Пошук за назвою або змістом..."
        className="flex-1 p-2 border rounded-lg"
      />
      <select 
        onChange={(e) => handleTagFilter(e.target.value)}
        className="p-2 border rounded-lg bg-white"
        defaultValue={searchParams.get('tag') || ""}
      >
        <option value="">Всі теги</option>
        {tags?.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}