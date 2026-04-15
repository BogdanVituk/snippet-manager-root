'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/snippets';
import SnippetForm from './SnippetForm';
import { CreateSnippetDto } from '../services/types/snippet';

export default function CreateSnippetSidebar() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: api.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });

  return (
    <div className="md:col-span-1">
      <h2 className="text-xl mb-4 font-semibold">Додати новий</h2>
      <SnippetForm
        onSubmit={mutate}
        isLoading={isPending}
      />
    </div>
  );
}