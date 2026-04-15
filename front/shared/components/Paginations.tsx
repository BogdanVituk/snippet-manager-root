'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(createPageUrl(page));
    }
  };

  if (totalPages <= 1) return null; 
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
     
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
      >
        ←
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm transition ${
              isActive 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            {page}
          </button>
        );
      })}


      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition"
      >
        →
      </button>
    </div>
  );
}