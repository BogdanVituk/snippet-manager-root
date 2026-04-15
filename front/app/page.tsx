import CreateSnippetSidebar from '@/shared/components/CreateSnippetSidebar';
import SearchFilters from '@/shared/components/SearchFilters';
import SnippetsList from '@/shared/components/SnippetList';


export const SnippetsPage = () => {

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        
      <h1 className="text-3xl font-bold mb-8">My Snippets</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <CreateSnippetSidebar />

        <div className="md:col-span-2">
          <h2 className="text-xl mb-4">Усі сніпети</h2>

          <SearchFilters />

          <SnippetsList />

        </div>
        </div>
      </div>
    </div>

  );
};

export default SnippetsPage;