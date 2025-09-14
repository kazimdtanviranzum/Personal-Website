import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useResearch } from "../hooks/useContent";
import { 
    AcademicCapIcon, 
    BeakerIcon,
    CalendarDaysIcon,
    LinkIcon,
    DocumentTextIcon
} from "@heroicons/react/24/outline";

const ResearchPage = () => {
    const { data: researchData, isLoading, error } = useResearch();
    const research = researchData?.items || [];

    if (isLoading) return <LoadingScreen />;

    if (error) {
        return (
            <section className="py-12">
                <div className="container mx-auto text-center">
                    <p className="text-red-600">Failed to load research data. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                        <BeakerIcon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Research <span className="text-purple-600">Portfolio</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Exploring innovative solutions and advancing knowledge through cutting-edge research
                    </p>
                </div>

                {research.length === 0 ? (
                    <div className="text-center py-12">
                        <BeakerIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600">No research data available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {research.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-purple-200"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                                            <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            {item.year && (
                                                <div className="flex items-center text-gray-600 mb-1">
                                                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                                                    <span className="text-sm font-medium">{item.year}</span>
                                                </div>
                                            )}
                                            {item.status && (
                                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                    item.status.toLowerCase() === 'completed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.status.toLowerCase() === 'ongoing'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Hover indicator */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    
                                    {item.description && (
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}

                                    {/* Research Area */}
                                    {item.area && (
                                        <div className="flex items-center space-x-2">
                                            <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">
                                                <strong>Research Area:</strong> {item.area}
                                            </span>
                                        </div>
                                    )}

                                    {/* Keywords */}
                                    {item.keywords && item.keywords.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">Keywords:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.keywords.map((keyword, kidx) => (
                                                    <span
                                                        key={kidx}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Publications */}
                                    {item.publications && item.publications.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">Related Publications:</p>
                                            <div className="space-y-1">
                                                {item.publications.map((pub, pidx) => (
                                                    <div key={pidx} className="text-sm text-blue-600 hover:text-blue-800">
                                                        • {pub.title} ({pub.year})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Funding */}
                                    {item.funding && (
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <p className="text-sm text-green-800">
                                                <strong>Funding:</strong> {item.funding}
                                            </p>
                                        </div>
                                    )}

                                    {/* Collaborators */}
                                    {item.collaborators && item.collaborators.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">Collaborators:</p>
                                            <p className="text-sm text-gray-600">
                                                {item.collaborators.join(', ')}
                                            </p>
                                        </div>
                                    )}

                                    {/* Link */}
                                    {item.link && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <a
                                                href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                                >
                                                <LinkIcon className="h-4 w-4" />
                                                <span className="text-sm font-medium">View Research Details</span>
                                </a>
                                        </div>
                            )}
                                </div>
                        </div>
                    ))}
                    </div>
                )}

                {/* Bottom decorative element */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-400">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                        <BeakerIcon className="h-5 w-5" />
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
                    </div>
                </div>
                </div>
            </section>
    );
};

export default ResearchPage;
