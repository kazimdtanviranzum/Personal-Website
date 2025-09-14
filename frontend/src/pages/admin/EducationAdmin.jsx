import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const EducationAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: educationData, isLoading } = useEducation();
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const education = educationData?.items || [];

  const onSubmit = async (data) => {
    try {
      if (editingItem) {
        await updateEducation.mutateAsync({ id: editingItem._id, data });
      } else {
        await createEducation.mutateAsync(data);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const resetForm = () => {
    reset();
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('degree', item.degree);
    setValue('institution', item.institution);
    setValue('year', item.year);
    setValue('location', item.location || '');
    setValue('cgpa', item.cgpa || '');
    setValue('description', item.description || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      await deleteEducation.mutateAsync(id);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Education Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Education Record' : 'Add Education Record'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree *</label>
                <input
                  {...register('degree', { required: 'Degree is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
                {errors.degree && (
                  <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Institution *</label>
                <input
                  {...register('institution', { required: 'Institution is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., University Name"
                />
                {errors.institution && (
                  <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year *</label>
                <input
                  {...register('year', { required: 'Year is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2018-2022 or 2022"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('location')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CGPA/Result</label>
                <input
                  {...register('cgpa')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 3.8/4.0 or First Class"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Additional details about the education..."
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
                disabled={createEducation.isLoading || updateEducation.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {createEducation.isLoading || updateEducation.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Education List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Education Records ({education.length})
          </h3>
          
          {education.length === 0 ? (
            <div className="text-center py-12">
              <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No education records</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first education record.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Education
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{item.degree}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.institution}</p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📅 {item.year}</span>
                        {item.location && <span>📍 {item.location}</span>}
                        {item.cgpa && <span>🎓 {item.cgpa}</span>}
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                      )}
                      <div className="mt-2 text-xs text-gray-400">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center p-2 text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center p-2 text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationAdmin;
