import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePersonal, useUpdatePersonal } from '../../hooks/useContent';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const PersonalInfoAdmin = () => {
  const { data: personal, isLoading } = usePersonal();
  const updatePersonal = useUpdatePersonal();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  // Initialize form when data loads
  React.useEffect(() => {
    if (personal) {
      reset(personal);
    }
  }, [personal, reset]);

  const socialLinks = watch('socialLinks') || [];

  const onSubmit = async (data) => {
    const result = await updatePersonal.mutateAsync(data);
    if (result) {
      setIsEditing(false);
    }
  };

  const addSocialLink = () => {
    const currentLinks = socialLinks;
    setValue('socialLinks', [
      ...currentLinks,
      { name: '', url: '', icon: '' }
    ]);
  };

  const removeSocialLink = (index) => {
    const currentLinks = socialLinks;
    setValue('socialLinks', currentLinks.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Basic Information */}
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <input
                {...register('designation', { required: 'Designation is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.designation && (
                <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                {...register('department', { required: 'Department is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                {...register('institution', { required: 'Institution is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.institution && (
                <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                {...register('city', { required: 'City is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                {...register('country', { required: 'Country is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="sm:col-span-2 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Email</label>
              <input
                {...register('email1', { 
                  required: 'Primary email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email'
                  }
                })}
                type="email"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.email1 && (
                <p className="mt-1 text-sm text-red-600">{errors.email1.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Secondary Email</label>
              <input
                {...register('email2', {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email'
                  }
                })}
                type="email"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.email2 && (
                <p className="mt-1 text-sm text-red-600">{errors.email2.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                type="text"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CV Link</label>
              <input
                {...register('cv_link')}
                type="url"
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Office Address</label>
              <textarea
                {...register('office', { required: 'Office address is required' })}
                rows={2}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.office && (
                <p className="mt-1 text-sm text-red-600">{errors.office.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Home Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                rows={2}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="sm:col-span-2 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                {isEditing && (
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Link
                  </button>
                )}
              </div>

              {socialLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4 p-4 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      {...register(`socialLinks.${index}.name`)}
                      type="text"
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      {...register(`socialLinks.${index}.url`)}
                      type="url"
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="flex items-end">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset(personal);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updatePersonal.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {updatePersonal.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoAdmin;
