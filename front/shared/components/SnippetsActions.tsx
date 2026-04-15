'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/snippets'
import Modal from '../components/Modal';
import { useRouter } from 'next/navigation';
import { ISnippet, UpdateSnippetDto } from '../services/types/snippet';

export default function SnippetActions({ snippet }: { snippet: ISnippet }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateSnippetDto) => api.update(snippet._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      setIsModalOpen(false);
      router.refresh(); 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(snippet._id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      router.push('/');
    },
  });

  return (
    <div>
       <div className="flex gap-4">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
      >
        Edit
      </button>
      
      <button 
        onClick={() => {
          if(confirm('Delete this snippet?')) deleteMutation.mutate();
        }}
        className="px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
      >
        {deleteMutation.isPending ? 'Removing...' : 'Remove'}
      </button>

    </div>
     <Modal
        updateMutation={updateMutation}
        selectedSnippet={snippet}
        closeModal={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </div>

    
  );
}