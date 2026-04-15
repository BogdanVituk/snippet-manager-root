'use client'

import { ISnippet } from "../services/types/snippet"
import { useQuery } from "@tanstack/react-query";
import { api } from '../services/snippets'
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "./Paginations";
import SnippetItem from "./SnippetItem";


const SnippetsList = () => {

    const searchParams = useSearchParams();

    const q = searchParams.get('q') || '';
    const page = Number(searchParams.get('page')) || 1;
    const tag = searchParams.get('tag') || '';

    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['snippets', q, page, tag],
        queryFn: () => api.getAll({ q, page, tag }),
    });

    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
                Не вдалося завантажити сніпети. Спробуйте оновити сторінку.
            </div>
        );
    }

    if(isLoading) {
        return <p>Завантаження...</p>
    }

    if (!data?.data.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900">Нічого не знайдено</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-2">
                    Спробуйте змінити запит або вибрати інший тег.
                </p>      
            </div>
        );
    }

  return (
    <div className="space-y-4"> 
      {data?.data.map((snippet: ISnippet) => (
            <SnippetItem key={snippet._id} snippet={snippet} />
      ))}
      <Pagination totalPages={data?.meta.lastPage || 0} />
    </div>  
  )
}

export default SnippetsList;