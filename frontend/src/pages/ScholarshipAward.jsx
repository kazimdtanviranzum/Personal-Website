import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useScholarshipsAwards } from "../hooks/useContent";
import { 
    TrophyIcon, 
    AcademicCapIcon,
    CalendarDaysIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    StarIcon
} from "@heroicons/react/24/outline";

export function ScholarshipAndAwardsPage() {
  const { data: awardsData, isLoading, error } = useScholarshipsAwards();
  const awards = awardsData?.items || [];

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Failed to load scholarships and awards data. Please try again later.</p>
        </div>
      </section>
    );
  }

  const getAwardTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'scholarship':
        return <AcademicCapIcon className="h-6 w-6" />;
      case 'award':
        return <TrophyIcon className="h-6 w-6" />;
      case 'grant':
        return <CurrencyDollarIcon className="h-6 w-6" />;
      default:
        return <StarIcon className="h-6 w-6" />;
    }
  };

  const getAwardTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'scholarship':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'award':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'grant':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-purple-100 text-purple-600 border-purple-200';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <TrophyIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scholarships & <span className="text-purple-600">Awards</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Recognition of academic excellence and research achievements
          </p>
        </div>

        {awards.length === 0 ? (
          <div className="text-center py-12">
            <TrophyIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600">No awards or scholarships data available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div
                key={award._id || index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-purple-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${getAwardTypeColor(award.type)} group-hover:scale-110 transition-transform duration-300`}>
                    {getAwardTypeIcon(award.type)}
                  </div>
                  
                  {/* Type Badge */}
                  {award.type && (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getAwardTypeColor(award.type)}`}>
                      {award.type}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {award.title}
                  </h3>

                  {/* Year */}
                  {award.year && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{award.year}</span>
                    </div>
                  )}

                  {/* Organization */}
                  {award.organization && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span className="text-sm">{award.organization}</span>
                    </div>
                  )}

                  {/* Amount */}
                  {award.amount && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {award.amount}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {award.description && (
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {award.description}
                    </p>
                  )}

                  {/* Additional Details */}
                  {award.criteria && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Criteria:</strong> {award.criteria}
                      </p>
                    </div>
                  )}

                  {/* Duration */}
                  {award.duration && (
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span><strong>Duration:</strong> {award.duration}</span>
                    </div>
                  )}

                  {/* Status */}
                  {award.status && (
                    <div className="pt-4 border-t border-gray-100">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        award.status.toLowerCase() === 'received' 
                          ? 'bg-green-100 text-green-800'
                          : award.status.toLowerCase() === 'pending'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {award.status}
                      </span>
                    </div>
                  )}

                  {/* Hover effect indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics Section */}
        {awards.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Achievement Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{awards.length}</div>
                <div className="text-gray-600">Total Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {awards.filter(a => a.type?.toLowerCase() === 'scholarship').length}
                </div>
                <div className="text-gray-600">Scholarships</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {awards.filter(a => a.type?.toLowerCase() === 'award').length}
                </div>
                <div className="text-gray-600">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {awards.filter(a => a.type?.toLowerCase() === 'grant').length}
                </div>
                <div className="text-gray-600">Grants</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
            <TrophyIcon className="h-5 w-5" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
