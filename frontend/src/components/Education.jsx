import { AcademicCapIcon, MapPinIcon, CalendarDaysIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import EducationImage from "./../assets/education.png";
import LoadingScreen from "./LoadingScreen";
import { useEducation } from "../hooks/useContent";

export function Education() {
    const { data: educationData, isLoading, error } = useEducation();
    const education = educationData?.items || [];

    if (isLoading) return <LoadingScreen />;
    
    if (error) {
        return (
            <section id="education" className="py-12">
                <div className="container mx-auto text-center">
                    <p className="text-red-600">Failed to load education data. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                        <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Educational <span className="text-blue-600">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A comprehensive overview of academic achievements and qualifications
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                    {/* Left section - Image */}
                    <div className="order-2 xl:order-1">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl rotate-3 opacity-20"></div>
                            <img
                                src={EducationImage}
                                alt="Education Journey"
                                className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl object-cover"
                            />
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <TrophyIcon className="h-8 w-8 text-yellow-800" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <BuildingLibraryIcon className="h-6 w-6 text-green-800" />
                            </div>
                        </div>
                    </div>

                    {/* Right section - Education Cards */}
                    <div className="order-1 xl:order-2 space-y-6">
                        {education.length === 0 ? (
                            <div className="text-center py-12">
                                <AcademicCapIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                <p className="text-gray-600">No education records available.</p>
                            </div>
                        ) : (
                            education.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-3 top-8 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg group-hover:bg-blue-700 transition-colors duration-300"></div>
                                    
                                    {/* Timeline line */}
                                    {index !== education.length - 1 && (
                                        <div className="absolute -left-1 top-14 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-blue-100"></div>
                                    )}

                                    {/* Content */}
                                    <div className="ml-6">
                                        {/* Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                                    {item.degree}
                                                </h3>
                                                <div className="flex items-center text-gray-700 mb-2">
                                                    <BuildingLibraryIcon className="h-4 w-4 mr-2 text-blue-500" />
                                                    <span className="font-medium">{item.institution}</span>
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 px-3 py-1 rounded-full">
                                                <div className="flex items-center text-blue-700">
                                                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                                                    <span className="text-sm font-semibold">{item.year}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-3">
                                            {item.location && (
                                                <div className="flex items-center text-gray-600">
                                                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                    <span className="text-sm">{item.location}</span>
                                                </div>
                                            )}

                                            {item.cgpa && (
                                                <div className="flex items-center">
                                                    <TrophyIcon className="h-4 w-4 mr-2 text-yellow-500" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        CGPA: <span className="text-yellow-600 font-bold">{item.cgpa}</span>
                                                    </span>
                                                </div>
                                            )}

                                            {item.description && (
                                                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover effect indicator */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-400">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                        <AcademicCapIcon className="h-5 w-5" />
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
