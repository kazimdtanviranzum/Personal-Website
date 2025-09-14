import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  useResearch,
  useCreateResearch,
  useUpdateResearch,
  useDeleteResearch,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BeakerIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

const ResearchAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: researchData, isLoading } = useResearch();
  const createResearch = useCreateResearch();
  const updateResearch = useUpdateResearch();
  const deleteResearch = useDeleteResearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      keywords: [''],
      collaborators: [''],
      status: 'ongoing',
    },
  });

  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
    control,
    name: 'keywords',
  });

  const { fields: collaboratorFields, append: appendCollaborator, remove: removeCollaborator } = useFieldArray({
    control,
    name: 'collaborators',
  });

  const research = researchData?.items || [];

  const onSubmit = async (data) => {
    try {
      // Filter out empty arrays
      const filteredData = {
        ...data,
        keywords: data.keywords.filter(keyword => keyword.trim() !== ''),
        collaborators: data.collaborators.filter(collaborator => collaborator.trim() !== ''),
      };

      if (editingItem) {
        await updateResearch.mutateAsync({ id: editingItem._id, data: filteredData });
      } else {
        await createResearch.mutateAsync(filteredData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving research:', error);
    }
  };

  const resetForm = () => {
    reset({
      keywords: [''],
      collaborators: [''],
      status: 'ongoing',
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('title', item.title);
    setValue('description', item.description);
    setValue('keywords', item.keywords.length > 0 ? item.keywords : ['']);
    setValue('startDate', item.startDate || '');
    setValue('endDate', item.endDate || '');
    setValue('status', item.status);
    setValue('collaborators', item.collaborators.length > 0 ? item.collaborators : ['']);
    setValue('funding', item.funding || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this research project?')) {
      await deleteResearch.mutateAsync(id);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ongoing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      planned: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || colors.ongoing;
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
        <h1 className="text-2xl font-bold text-gray-900">Research Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Research
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Research Project' : 'Add Research Project'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Research project title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Research project description..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Keywords */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <button
                  type="button"
                  onClick={() => appendKeyword('')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {keywordFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`keywords.${index}`)}
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder={`Keyword ${index + 1}`}
                    />
                    {keywordFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyword(index)}
                        className="inline-flex items-center p-1 text-red-600 hover:text-red-900"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  {...register('startDate')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., January 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  {...register('endDate')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., December 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Collaborators</label>
                <button
                  type="button"
                  onClick={() => appendCollaborator('')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {collaboratorFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`collaborators.${index}`)}
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder={`Collaborator ${index + 1}`}
                    />
                    {collaboratorFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCollaborator(index)}
                        className="inline-flex items-center p-1 text-red-600 hover:text-red-900"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Funding</label>
              <input
                {...register('funding')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Funding source or grant information"
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
                disabled={createResearch.isLoading || updateResearch.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {createResearch.isLoading || updateResearch.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Research List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Research Projects ({research.length})
          </h3>
          
          {research.length === 0 ? (
            <div className="text-center py-12">
              <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No research projects</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first research project.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Research
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project & Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keywords
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Funding & Collaborators
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {research.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-sm">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                          <div className="text-xs text-gray-400 mt-1">
                            Created: {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.startDate && (
                            <div>Start: {item.startDate}</div>
                          )}
                          {item.endDate && (
                            <div>End: {item.endDate}</div>
                          )}
                          {!item.startDate && !item.endDate && (
                            <span className="text-gray-400">Not specified</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {item.keywords && item.keywords.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {item.keywords.slice(0, 3).map((keyword, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                              {item.keywords.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{item.keywords.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No keywords</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs text-sm text-gray-600">
                          {item.funding && (
                            <div className="mb-1">
                              <strong>Funding:</strong> {item.funding.length > 30 ? `${item.funding.substring(0, 30)}...` : item.funding}
                            </div>
                          )}
                          {item.collaborators && item.collaborators.length > 0 && (
                            <div>
                              <strong>Collaborators:</strong> {item.collaborators.slice(0, 2).join(', ')}
                              {item.collaborators.length > 2 && ` +${item.collaborators.length - 2} more`}
                            </div>
                          )}
                          {!item.funding && (!item.collaborators || item.collaborators.length === 0) && (
                            <span className="text-xs text-gray-400">Not specified</span>
                          )}
                        </div>
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

export default ResearchAdmin;
