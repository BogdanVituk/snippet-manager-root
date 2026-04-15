import Link from "next/link"
import { ISnippet } from "../services/types/snippet"

interface SnipetItemProps {
    snippet: ISnippet
}

const SnippetItem = ({snippet}: SnipetItemProps) => {     
    return (
         <Link key={snippet._id} href={`/snipet/${snippet._id}`} className="block">
              <div  className="p-4 border rounded hover:border-blue-500 transition shadow-sm bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{snippet.title}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded uppercase">{snippet.type}</span>
                </div>
                <pre className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                  {snippet.content}
                </pre>
                <div className="mt-2 flex gap-2">
                  {snippet.tags.map(tag => (
                    <span key={tag} className="text-blue-500 text-xs">#{tag}</span>
                  ))}
                </div>
              </div>
          </Link>
    )
}

export default SnippetItem