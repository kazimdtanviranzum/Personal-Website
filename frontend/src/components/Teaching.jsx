import React from "react";
import LoadingScreen from "./LoadingScreen";
import { useTeaching } from "../hooks/useContent";
import { 
    AcademicCapIcon, 
    CalendarDaysIcon,
    UserGroupIcon,
    DocumentTextIcon,
    LinkIcon
} from "@heroicons/react/24/outline";

export function Teaching() {
    const { data: teachingData, isLoading, error } = useTeaching();
    const teaching = teachingData?.items || [];

    if (isLoading) return <LoadingScreen />;
    
    if (error) {
        return (
            <section className="py-12">
                <div className="container mx-auto text-center">
                    <p className="text-red-600">Failed to load teaching data. Please try again later.</p>
                </div>
            </section>
        );
    }

    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'undergraduate':
                return 'bg-blue-100 text-blue-800';
            case 'graduate':
                return 'bg-purple-100 text-purple-800';
            case 'masters':
                return 'bg-green-100 text-green-800';
            case 'phd':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getSemesterColor = (semester) => {
        switch (semester?.toLowerCase()) {
            case 'spring':
                return 'bg-green-50 text-green-700';
            case 'summer':
                return 'bg-yellow-50 text-yellow-700';
            case 'fall':
                return 'bg-orange-50 text-orange-700';
            case 'winter':
                return 'bg-blue-50 text-blue-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-green-50 to-teal-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <AcademicCapIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Teaching <span className="text-green-600">Experience</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Courses taught and academic contributions in higher education
                    </p>
                </div>

                {teaching.length === 0 ? (
                    <div className="text-center py-12">
                        <AcademicCapIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600">No teaching records available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {teaching.map((course, index) => (
                            <div
                                key={course._id || index}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                                            <AcademicCapIcon className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                                                    {course.level}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSemesterColor(course.semester)}`}>
                                                    {course.semester} {course.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Hover indicator */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                            {course.courseCode}: {course.courseName}
                                        </h3>
                                        {course.department && (
                                            <p className="text-gray-600 text-sm mt-1">
                                                Department: {course.department}
                                            </p>
                                        )}
                                    </div>

                                    {/* Course Details */}
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {course.credits && (
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <DocumentTextIcon className="h-4 w-4" />
                                                <span>{course.credits} Credits</span>
                                            </div>
                                        )}
                                        {course.students && (
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <UserGroupIcon className="h-4 w-4" />
                                                <span>{course.students} Students</span>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <CalendarDaysIcon className="h-4 w-4" />
                                            <span>{course.semester} {course.year}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {course.description && (
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {course.description}
                                        </p>
                                    )}

                                    {/* Topics */}
                                    {course.topics && course.topics.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {course.topics.map((topic, topicIndex) => (
                                                    <span
                                                        key={topicIndex}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Syllabus Link */}
                                    {course.syllabus && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <a
                                                href={course.syllabus}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                                            >
                                                <LinkIcon className="h-4 w-4" />
                                                <span className="text-sm font-medium">View Syllabus</span>
                                            </a>
                                        </div>
                                    )}

                                    {/* Course Materials */}
                                    {course.materials && course.materials.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Course Materials:</h4>
                                            <div className="space-y-1">
                                                {course.materials.map((material, matIndex) => (
                                                    <a
                                                        key={matIndex}
                                                        href={material.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        📄 {material.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Teaching Methods */}
                                    {course.methods && course.methods.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Teaching Methods:</h4>
                                            <ul className="space-y-1">
                                                {course.methods.map((method, methodIndex) => (
                                                    <li key={methodIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span>{method}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Teaching Statistics */}
                {teaching.length > 0 && (
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Teaching Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{teaching.length}</div>
                                <div className="text-gray-600">Total Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                    {teaching.filter(c => c.level?.toLowerCase() === 'undergraduate').length}
                                </div>
                                <div className="text-gray-600">Undergraduate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">
                                    {teaching.filter(c => c.level?.toLowerCase() === 'graduate').length}
                                </div>
                                <div className="text-gray-600">Graduate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600">
                                    {teaching.reduce((total, course) => total + (course.students || 0), 0)}
                                </div>
                                <div className="text-gray-600">Total Students</div>
                            </div>
                        </div>
                    </div>
                )}

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
