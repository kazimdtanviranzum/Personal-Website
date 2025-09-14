import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  BeakerIcon,
  NewspaperIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import useAdminStore from '../../stores/adminStore';
import useAuthStore from '../../stores/authStore';

const AdminDashboard = () => {
  const { dashboardStats, isLoading, fetchDashboardStats } = useAdminStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (fetchDashboardStats) {
      fetchDashboardStats();
    }
  }, [fetchDashboardStats]);

  const stats = [
    {
      name: 'Education Records',
      value: dashboardStats?.education || 0,
      icon: AcademicCapIcon,
      color: 'bg-blue-500',
      href: '/admin/education',
    },
    {
      name: 'Experience Records',
      value: dashboardStats?.experience || 0,
      icon: BriefcaseIcon,
      color: 'bg-green-500',
      href: '/admin/experience',
    },
    {
      name: 'Publications',
      value: dashboardStats?.publications || 0,
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      href: '/admin/publications',
    },
    {
      name: 'Research Projects',
      value: dashboardStats?.research || 0,
      icon: BeakerIcon,
      color: 'bg-indigo-500',
      href: '/admin/research',
    },
    {
      name: 'News Articles',
      value: dashboardStats?.news || 0,
      icon: NewspaperIcon,
      color: 'bg-yellow-500',
      href: '/admin/news',
    },
    {
      name: 'Awards & Scholarships',
      value: dashboardStats?.scholarshipsAwards || 0,
      icon: TrophyIcon,
      color: 'bg-red-500',
      href: '/admin/awards',
    },
    {
      name: 'Teaching Records',
      value: dashboardStats?.teaching || 0,
      icon: AcademicCapIcon,
      color: 'bg-pink-500',
      href: '/admin/teaching',
    },
    {
      name: 'Admin Users',
      value: dashboardStats?.admins || 0,
      icon: UsersIcon,
      color: 'bg-gray-500',
      href: '/admin/settings',
    },
  ];

  const quickActions = [
    {
      name: 'Add Publication',
      description: 'Add a new research publication',
      href: '/admin/publications/new',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      name: 'Create News',
      description: 'Publish a new news article',
      href: '/admin/news/new',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Add Research',
      description: 'Add a new research project',
      href: '/admin/research/new',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Update Profile',
      description: 'Update personal information',
      href: '/admin/personal',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Admin'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's an overview of your website content. Manage all sections from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Content Overview</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={stat.name}
                  to={stat.href}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`${stat.color} p-2 rounded-md`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stat.value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className={`${action.color} p-6 rounded-lg text-white hover:shadow-lg transition-all transform hover:-translate-y-1`}
            >
              <h3 className="text-lg font-medium">{action.name}</h3>
              <p className="mt-2 text-sm opacity-90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                System is running smoothly
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Admin panel is ready for content management
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                All content types are available for editing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Admin Panel v1.0 | Built with React & TailwindCSS
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
