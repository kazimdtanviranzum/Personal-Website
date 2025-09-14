import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useTeaching,
  useCreateTeaching,
  useUpdateTeaching,
  useDeleteTeaching,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const TeachingAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: teachingData, isLoading } = useTeaching();
  const createTeaching = useCreateTeaching();
  const updateTeaching = useUpdateTeaching();
  const deleteTeaching = useDeleteTeaching();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      level: 'undergraduate',
    },
  });

  const teaching = teachingData?.items || [];

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        year: parseInt(data.year),
        credits: data.credits ? parseInt(data.credits) : undefined,
        students: data.students ? parseInt(data.students) : undefined,
      };

      if (editingItem) {
        await updateTeaching.mutateAsync({ id: editingItem._id, data: formattedData });
      } else {
        await createTeaching.mutateAsync(formattedData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving teaching record:', error);
    }
  };

  const resetForm = () => {
    reset({
      level: 'undergraduate',
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('courseCode', item.courseCode);
    setValue('courseName', item.courseName);
    setValue('semester', item.semester);
    setValue('year', item.year);
    setValue('level', item.level);
    setValue('credits', item.credits || '');
    setValue('students', item.students || '');
    setValue('description', item.description || '');
    setValue('syllabus', item.syllabus || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teaching record?')) {
      await deleteTeaching.mutateAsync(id);
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      undergraduate: 'bg-blue-100 text-blue-800',
      graduate: 'bg-green-100 text-green-800',
      postgraduate: 'bg-purple-100 text-purple-800',
    };
    return colors[level] || colors.undergraduate;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teaching Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Teaching Record' : 'Add Teaching Record'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code *</label>
                <input
                  {...register('courseCode', { required: 'Course code is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., CS101"
                />
                {errors.courseCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.courseCode.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name *</label>
                <input
                  {...register('courseName', { required: 'Course name is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Introduction to Computer Science"
                />
                {errors.courseName && (
                  <p className="mt-1 text-sm text-red-600">{errors.courseName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Semester *</label>
                <input
                  {...register('semester', { required: 'Semester is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Fall, Spring, Summer"
                />
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-600">{errors.semester.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year *</label>
                <input
                  {...register('year', { 
                    required: 'Year is required',
                    min: { value: 2000, message: 'Year must be after 2000' },
                    max: { value: new Date().getFullYear() + 2, message: 'Year cannot be too far in the future' }
                  })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 2024"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level *</label>
                <select
                  {...register('level', { required: 'Level is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Credits</label>
                <input
                  {...register('credits', {
                    min: { value: 1, message: 'Credits must be at least 1' },
                    max: { value: 10, message: 'Credits cannot exceed 10' }
                  })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 3"
                />
                {errors.credits && (
                  <p className="mt-1 text-sm text-red-600">{errors.credits.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Students</label>
                <input
                  {...register('students', {
                    min: { value: 1, message: 'Students must be at least 1' },
                    max: { value: 1000, message: 'Students cannot exceed 1000' }
                  })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 25"
                />
                {errors.students && (
                  <p className="mt-1 text-sm text-red-600">{errors.students.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Syllabus URL</label>
                <input
                  {...register('syllabus')}
                  type="url"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Link to course syllabus"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                placeholder="Course description, objectives, or additional information..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createTeaching.isLoading || updateTeaching.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {createTeaching.isLoading || updateTeaching.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teaching List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Teaching Records ({teaching.length})
          </h3>
          
          {teaching.length === 0 ? (
            <div className="text-center py-12">
              <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No teaching records</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first teaching record.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Course
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resources
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teaching.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-sm">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.courseCode}: {item.courseName}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                          )}
                          <div className="text-xs text-gray-400 mt-1">
                            Created: {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                          {item.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.semester} {item.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1 text-sm text-gray-500">
                          {item.credits && (
                            <span className="inline-flex items-center">
                              📚 {item.credits} credits
                            </span>
                          )}
                          {item.students && (
                            <span className="inline-flex items-center">
                              👥 {item.students} students
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.syllabus && (
                          <a 
                            href={item.syllabus} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                          >
                            📄 Syllabus
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachingAdmin;
