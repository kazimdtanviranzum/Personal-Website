import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { usePublications } from "../hooks/useContent";

export function PublicationPage() {
  const { data: publicationsData, isLoading, error } = usePublications();
  const publications = publicationsData?.items || [];

  if (isLoading) return <LoadingScreen />;
  
  if (error) {
    return (
      <section id="publications" className="py-12">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Failed to load publications data. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Group publications by type
  const groupedPublications = publications.reduce((acc, pub) => {
    const type = pub.type || 'journal';
    if (!acc[type]) acc[type] = [];
    acc[type].push(pub);
    return acc;
  }, {});

  const getTypeTitle = (type) => {
    const titles = {
      journal: 'Journal Publications',
      conference: 'Conference Publications',
      book: 'Books',
      chapter: 'Book Chapters',
      preprint: 'Preprints'
    };
    return titles[type] || type.charAt(0).toUpperCase() + type.slice(1) + ' Publications';
  };

  return (
    <section id="publications" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-medium text-gray-800 dark:text-gray-100 mb-8">
          Publications
        </h2>
        
        {publications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No publications available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPublications).map(([type, pubs]) => (
              <div key={type}>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                  {getTypeTitle(type)} ({pubs.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pubs.map((pub, index) => (
                    <div
                      key={pub._id || index}
                      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                    >
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </h4>
                      
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                          <span className="font-semibold">Authors:</span> {pub.authors.join(', ')}
                        </p>
                        <p>
                          <span className="font-semibold">Published in:</span> {pub.journal}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <span><span className="font-semibold">Year:</span> {pub.year}</span>
                          {pub.volume && <span><span className="font-semibold">Volume:</span> {pub.volume}</span>}
                          {pub.pages && <span><span className="font-semibold">Pages:</span> {pub.pages}</span>}
                        </div>
                        {pub.doi && (
                          <p>
                            <span className="font-semibold">DOI:</span> 
                            <a 
                              href={`https://doi.org/${pub.doi}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                            >
                              {pub.doi}
                            </a>
                          </p>
                        )}
                        {pub.abstract && (
                          <div>
                            <span className="font-semibold">Abstract:</span>
                            <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-3">
                              {pub.abstract}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          pub.type === 'journal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                          pub.type === 'conference' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                          pub.type === 'book' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                        }`}>
                          {pub.type}
                        </span>
                        
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View Publication →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
