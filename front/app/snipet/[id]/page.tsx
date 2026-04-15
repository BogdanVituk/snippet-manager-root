import { api } from '../../../shared/services/snippets'
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SnippetActions from '../../../shared/components/SnippetsActions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetDetailPage({ params }: PageProps) {

  const { id } = await params;
  const snippet = await api.getOne(id);

  if (!snippet) {
    notFound();
  }

  return (
    <div >
    <main className="max-w-7xl mx-auto p-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 mb-8 block">
            ← Back to all snippets
          </Link>

          <article className="bg-white rounded-2xl border p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">
                  {snippet.type}
                </span>
                <h1 className="text-3xl font-bold mt-2">{snippet.title}</h1>
              </div>
              <time className="text-sm text-gray-400">
                {new Date(snippet.createdAt).toLocaleDateString()}
              </time>
            </div>

            <div className="relative">
              <pre className="bg-gray-950 text-gray-100 p-6 rounded-xl overflow-x-auto font-mono text-sm border border-gray-800">
                <code>{snippet.content}</code>
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {snippet.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            <SnippetActions snippet={snippet} />

          </article>
        </main>
    </div>
   
  );
}