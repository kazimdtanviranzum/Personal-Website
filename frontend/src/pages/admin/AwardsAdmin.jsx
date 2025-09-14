import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useScholarshipsAwards,
  useCreateScholarshipAward,
  useUpdateScholarshipAward,
  useDeleteScholarshipAward,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

const AwardsAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: awardsData, isLoading } = useScholarshipsAwards();
  const createAward = useCreateScholarshipAward();
  const updateAward = useUpdateScholarshipAward();
  const deleteAward = useDeleteScholarshipAward();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      type: 'award',
    },
  });

  const awards = awardsData?.items || [];

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        year: parseInt(data.year),
      };

      if (editingItem) {
        await updateAward.mutateAsync({ id: editingItem._id, data: formattedData });
      } else {
        await createAward.mutateAsync(formattedData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving award:', error);
    }
  };

  const resetForm = () => {
    reset({
      type: 'award',
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('title', item.title);
    setValue('organization', item.organization);
    setValue('year', item.year);
    setValue('amount', item.amount || '');
    setValue('description', item.description || '');
    setValue('type', item.type);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this award/scholarship?')) {
      await deleteAward.mutateAsync(id);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      scholarship: 'bg-blue-100 text-blue-800',
      award: 'bg-yellow-100 text-yellow-800',
      grant: 'bg-green-100 text-green-800',
      fellowship: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || colors.award;
  };

  const getTypeIcon = (type) => {
    const icons = {
      scholarship: '🎓',
      award: '🏆',
      grant: '💰',
      fellowship: '🎯',
    };
    return icons[type] || '🏆';
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
        <h1 className="text-2xl font-bold text-gray-900">Awards & Scholarships Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Award
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Award/Scholarship' : 'Add Award/Scholarship'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Award or scholarship title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization *</label>
                <input
                  {...register('organization', { required: 'Organization is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Awarding organization"
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year *</label>
                <input
                  {...register('year', { 
                    required: 'Year is required',
                    min: { value: 1900, message: 'Year must be after 1900' },
                    max: { value: new Date().getFullYear() + 5, message: 'Year cannot be too far in the future' }
                  })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Year received"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type *</label>
                <select
                  {...register('type', { required: 'Type is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="award">Award</option>
                  <option value="scholarship">Scholarship</option>
                  <option value="grant">Grant</option>
                  <option value="fellowship">Fellowship</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  {...register('amount')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="e.g., $5,000 or Fully Funded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Description of the award or scholarship..."
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
                disabled={createAward.isLoading || updateAward.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {createAward.isLoading || updateAward.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Awards List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Awards & Scholarships ({awards.length})
          </h3>
          
          {awards.length === 0 ? (
            <div className="text-center py-12">
              <TrophyIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No awards or scholarships</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first award or scholarship.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Award
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center p-1 text-red-600 hover:text-red-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center p-1 text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Organization:</strong> {item.organization}
                  </p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">📅 {item.year}</span>
                    {item.amount && (
                      <span className="text-sm text-green-600 font-medium">💰 {item.amount}</span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>
                  )}

                  <div className="text-xs text-gray-400">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
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

export default AwardsAdmin;
