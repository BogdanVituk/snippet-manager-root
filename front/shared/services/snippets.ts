import {
  ISnippet,
  ISnippetFilters,
  IPaginatedResponse,
  CreateSnippetDto,
  UpdateSnippetDto,
  TagsResponse
} from './types/snippet';
import { apiInstance } from './instance';


export const api = {
  getAll: async (params: ISnippetFilters): Promise<IPaginatedResponse<ISnippet>> => {
    const { data } = await apiInstance.get<IPaginatedResponse<ISnippet>>('/snippets', { params });
    return data;
  },
  getTags: async (): Promise<TagsResponse> => {
    const { data } = await apiInstance.get<TagsResponse>('/snippets/tags');
    return data;
  },

  getOne: async (id: string): Promise<ISnippet> => {
    const { data } = await apiInstance.get<ISnippet>(`/snippets/${id}`);
    return data;
  },

  create: async (payload: CreateSnippetDto): Promise<ISnippet> => {
    const { data } = await apiInstance.post<ISnippet>('/snippets', payload);
    return data;
  },

  update: async (id: string, payload: UpdateSnippetDto): Promise<ISnippet> => {
    const { data } = await apiInstance.patch<ISnippet>(`/snippets/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<{ deleted: boolean }> => {
    const { data } = await apiInstance.delete(`/snippets/${id}`);
    return data;
  },
};