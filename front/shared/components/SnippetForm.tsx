'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateSnippetDto, ISnippet, SnippetType, UpdateSnippetDto } from '../services/types/snippet';


const snippetSchema = z.object({
  title: z.string().min(3, "Назва занадто коротка (мін. 3 символи)"),
  content: z.string().min(5, "Контент обов'язковий"),
  type: z.nativeEnum(SnippetType),
  tags: z.string()
  .optional()
});

type SnippetFormValues = z.infer<typeof snippetSchema>;

interface SnippetFormProps {
  initialData?: ISnippet;
  onSubmit: (data: CreateSnippetDto, options?: { onSuccess?: () => void }) => void;
  isLoading: boolean;
}

export default function SnippetForm({ initialData, onSubmit, isLoading }: SnippetFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: initialData
    ? { ...initialData, tags: initialData.tags.join(', ') } 
    : {}
  });

  const handleFormSubmit = (values: SnippetFormValues) => {
    const formattedData = {
      ...values,
      tags: values.tags 
        ? values.tags.split(',').map(t => t.trim()).filter(Boolean) 
        : []
    };
    onSubmit(formattedData, { onSuccess: () => reset()})
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-white p-6 rounded-xl border">
      <div>
        <label className="block text-sm font-medium mb-1">Заголовок</label>
        <input {...register('title')} className="w-full p-2 border rounded-md" placeholder="Назва сніпета" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Тип</label>
        <select {...register('type')} className="w-full p-2 border rounded-md">
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="command">Command</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Контент</label>
        <textarea {...register('content')} rows={5} className="w-full p-2 border rounded-md font-mono" />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Теги (через кому)</label>
        <input {...register('tags')} className="w-full p-2 border rounded-md" placeholder="react, nestjs, db" />
      </div>

      <button disabled={isLoading} className="w-auto bg-black text-white p-2 rounded-md hover:opacity-80 transition">
        {isLoading ? 'Збереження...' : 'Зберегти сніпет'}
      </button>
    </form>
  );
}