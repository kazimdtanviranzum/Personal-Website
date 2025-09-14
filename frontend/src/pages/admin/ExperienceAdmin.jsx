import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  useExperience,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

const ExperienceAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: experienceData, isLoading } = useExperience();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      responsibilities: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'responsibilities',
  });

  const experience = experienceData?.items || [];
  const currentField = watch('current');

  const onSubmit = async (data) => {
    try {
      // Filter out empty responsibilities
      const filteredData = {
        ...data,
        responsibilities: data.responsibilities.filter(r => r.trim() !== ''),
      };

      if (editingItem) {
        await updateExperience.mutateAsync({ id: editingItem._id, data: filteredData });
      } else {
        await createExperience.mutateAsync(filteredData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const resetForm = () => {
    reset({
      responsibilities: [''],
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('position', item.position);
    setValue('organization', item.organization);
    setValue('startDate', item.startDate);
    setValue('endDate', item.endDate || '');
    setValue('current', item.current || false);
    setValue('location', item.location || '');
    setValue('description', item.description || '');
    setValue('responsibilities', item.responsibilities.length > 0 ? item.responsibilities : ['']);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience record?')) {
      await deleteExperience.mutateAsync(id);
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
        <h1 className="text-2xl font-bold text-gray-900">Experience Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Experience Record' : 'Add Experience Record'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Position *</label>
                <input
                  {...register('position', { required: 'Position is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., Senior Software Engineer"
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Organization *</label>
                <input
                  {...register('organization', { required: 'Organization is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., Company Name"
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input
                  {...register('startDate', { required: 'Start date is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., January 2020 or 2020-01"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  {...register('endDate')}
                  type="text"
                  disabled={currentField}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100"
                  placeholder="e.g., December 2023 or leave empty if current"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center">
                  <input
                    {...register('current')}
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    This is my current position
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('location')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Brief description of the role..."
              />
            </div>

            {/* Responsibilities */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                <button
                  type="button"
                  onClick={() => append('')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`responsibilities.${index}`)}
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="inline-flex items-center p-1 text-red-600 hover:text-red-900"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
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
                disabled={createExperience.isLoading || updateExperience.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {createExperience.isLoading || updateExperience.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Experience Records ({experience.length})
          </h3>
          
          {experience.length === 0 ? (
            <div className="text-center py-12">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No experience records</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first experience record.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Experience
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {experience.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-medium text-gray-900">{item.position}</h4>
                        {item.current && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.organization}</p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📅 {item.startDate} - {item.current ? 'Present' : item.endDate || 'Present'}</span>
                        {item.location && <span>📍 {item.location}</span>}
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                      )}
                      {item.responsibilities && item.responsibilities.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Key Responsibilities:</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {item.responsibilities.map((resp, index) => (
                              <li key={index} className="text-sm text-gray-600">{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-400">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center p-2 text-green-600 hover:text-green-900"
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

export default ExperienceAdmin;
