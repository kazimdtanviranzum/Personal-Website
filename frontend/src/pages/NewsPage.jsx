import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useNews } from "../hooks/useContent";

const NewsPage = () => {
    const { data: newsData, isLoading, error } = useNews();
    const news = newsData?.items || [];

    if (isLoading) return <LoadingScreen />;
    
    if (error) {
        return (
            <section className="bg-white py-12">
                <div className="container mx-auto text-center">
                    <p className="text-red-600">Failed to load news data. Please try again later.</p>
                </div>
            </section>
        );
    }

    const getCategoryColor = (category) => {
        const colors = {
            announcement: 'bg-blue-100 text-blue-800',
            achievement: 'bg-green-100 text-green-800',
            publication: 'bg-purple-100 text-purple-800',
            event: 'bg-yellow-100 text-yellow-800',
            general: 'bg-gray-100 text-gray-800',
        };
        return colors[category] || colors.general;
    };

    return (
        <section className="bg-white">
            <div className="container mx-auto py-8">
                <h2 className="text-center text-4xl font-medium text-gray-800 dark:text-gray-100 mb-8">
                    News
                </h2>
                <div className="max-w-4xl mx-auto p-6">
                    {news.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-400">No news available at the moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {news
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((newsItem, index) => (
                                <div
                                    key={newsItem._id || index}
                                    className={`p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                                        newsItem.featured 
                                            ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' 
                                            : 'border-gray-200 bg-white dark:bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(newsItem.category)}`}>
                                                {newsItem.category}
                                            </span>
                                            {newsItem.featured && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(newsItem.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                                        {newsItem.title}
                                    </h2>
                                    
                                    {newsItem.image && (
                                        <div className="mb-4">
                                            <img 
                                                src={newsItem.image} 
                                                alt={newsItem.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="text-gray-700 dark:text-gray-300 mb-4">
                                        {newsItem.content.split('\n').map((paragraph, pIndex) => (
                                            <p key={pIndex} className="mb-2">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                    
                                    {newsItem.link && (
                                        <a
                                            href={newsItem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                                        >
                                            Read More
                                            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewsPage;
