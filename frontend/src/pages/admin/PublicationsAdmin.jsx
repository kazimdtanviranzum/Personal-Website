import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  usePublications,
  useCreatePublication,
  useUpdatePublication,
  useDeletePublication,
} from '../../hooks/useContent';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  MinusIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

const PublicationsAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: publicationsData, isLoading } = usePublications();
  const createPublication = useCreatePublication();
  const updatePublication = useUpdatePublication();
  const deletePublication = useDeletePublication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      authors: [''],
      type: 'journal',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authors',
  });

  const publications = publicationsData?.items || [];

  const onSubmit = async (data) => {
    try {
      // Filter out empty authors
      const filteredData = {
        ...data,
        authors: data.authors.filter(author => author.trim() !== ''),
        year: parseInt(data.year),
      };

      if (editingItem) {
        await updatePublication.mutateAsync({ id: editingItem._id, data: filteredData });
      } else {
        await createPublication.mutateAsync(filteredData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving publication:', error);
    }
  };

  const resetForm = () => {
    reset({
      authors: [''],
      type: 'journal',
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    // Set form values
    setValue('title', item.title);
    setValue('authors', item.authors.length > 0 ? item.authors : ['']);
    setValue('journal', item.journal);
    setValue('year', item.year);
    setValue('volume', item.volume || '');
    setValue('pages', item.pages || '');
    setValue('doi', item.doi || '');
    setValue('url', item.url || '');
    setValue('type', item.type);
    setValue('abstract', item.abstract || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      await deletePublication.mutateAsync(id);
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
        <h1 className="text-2xl font-bold text-gray-900">Publications Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Publication
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit Publication' : 'Add Publication'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Publication title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Authors */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Authors *</label>
                <button
                  type="button"
                  onClick={() => append('')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add Author
                </button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`authors.${index}`, { 
                        required: index === 0 ? 'At least one author is required' : false 
                      })}
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder={`Author ${index + 1}`}
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
              {errors.authors?.[0] && (
                <p className="mt-1 text-sm text-red-600">{errors.authors[0].message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Journal/Conference *</label>
                <input
                  {...register('journal', { required: 'Journal/Conference is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Journal or conference name"
                />
                {errors.journal && (
                  <p className="mt-1 text-sm text-red-600">{errors.journal.message}</p>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Publication year"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...register('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="journal">Journal</option>
                  <option value="conference">Conference</option>
                  <option value="book">Book</option>
                  <option value="chapter">Book Chapter</option>
                  <option value="preprint">Preprint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Volume</label>
                <input
                  {...register('volume')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Volume number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pages</label>
                <input
                  {...register('pages')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 123-135"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">DOI</label>
                <input
                  {...register('doi')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Digital Object Identifier"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                {...register('url')}
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Link to publication"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Abstract</label>
              <textarea
                {...register('abstract')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Publication abstract or summary..."
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
                disabled={createPublication.isLoading || updatePublication.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {createPublication.isLoading || updatePublication.isLoading
                  ? 'Saving...'
                  : editingItem
                  ? 'Update'
                  : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Publications List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Publications ({publications.length})
          </h3>
          
          {publications.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No publications</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first publication.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Publication
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {publications.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'journal' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'conference' ? 'bg-green-100 text-green-800' :
                          item.type === 'book' ? 'bg-purple-100 text-purple-800' :
                          item.type === 'chapter' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.type}
                        </span>
                        <span className="text-sm text-gray-500">{item.year}</span>
                      </div>
                      
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Authors:</strong> {item.authors.join(', ')}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Published in:</strong> {item.journal}
                        {item.volume && `, Vol. ${item.volume}`}
                        {item.pages && `, pp. ${item.pages}`}
                      </p>

                      {item.abstract && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.abstract}</p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                        {item.doi && <span>DOI: {item.doi}</span>}
                        {item.url && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800"
                          >
                            <LinkIcon className="h-3 w-3 mr-1" />
                            View Publication
                          </a>
                        )}
                      </div>

                      <div className="text-xs text-gray-400">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center p-2 text-purple-600 hover:text-purple-900"
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

export default PublicationsAdmin;
