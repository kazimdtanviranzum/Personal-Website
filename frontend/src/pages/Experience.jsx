import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useExperience } from "../hooks/useContent";
import { Teaching } from "../components/Teaching";

export function ExperiencePage() {
    const { data: experienceData, isLoading, error } = useExperience();
    const experience = experienceData?.items || [];

    if (isLoading) return <LoadingScreen />;
    
    if (error) {
        return (
            <div className="py-12">
                <div className="container mx-auto text-center">
                    <p className="text-red-600">Failed to load experience data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Professional Experience Section */}
            <section id="job-experiences" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Professional <span className="text-blue-600">Experience</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Career journey and professional accomplishments
                        </p>
                    </div>

                    {experience.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No professional experience records available.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {experience?.map((exp, index) => (
                                <div
                                    key={exp._id || index}
                                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                                >
                                    <div className="w-full flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                                                {exp.position}
                                            </h3>
                                            <p className="font-semibold text-gray-800 mb-1">{exp.organization}</p>
                                            {exp.location && (
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    📍 {exp.location}
                                                </p>
                                            )}
                                        </div>

                                        <div className="text-right ml-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                                            </p>
                                            {exp.current && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                    Current Position
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {exp.description && (
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {exp.description}
                                        </p>
                                    )}

                                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                                Key Responsibilities:
                                            </h4>
                                            <ul className="space-y-2">
                                                {exp.responsibilities.map((resp, respIndex) => (
                                                    <li
                                                        key={respIndex}
                                                        className="text-sm text-gray-700 flex gap-3 items-start"
                                                    >
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Hover effect indicator */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Teaching Experience Section */}
            <Teaching />
        </div>
    );
}
