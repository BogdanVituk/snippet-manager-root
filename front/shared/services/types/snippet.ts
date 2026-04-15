export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

export interface ISnippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export type CreateSnippetDto = Omit<ISnippet, '_id' | 'createdAt' | 'updatedAt'>;


export type UpdateSnippetDto = Partial<CreateSnippetDto>;

export interface IPaginationMeta {
  total: number;
  page: number;
  lastPage: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface ISnippetFilters {
  q?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export type TagsResponse = string[];