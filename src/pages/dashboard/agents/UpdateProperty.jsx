import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import {
  Home, MapPin, DollarSign, User, ImageIcon, CheckCircle
} from 'lucide-react';
import Swal from 'sweetalert2';

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/property/${id}`);
      reset(res.data);
      return res.data;
    }
  });
  // console.log(property);

  const updateMutation = useMutation({
  mutationFn: async (updatedData) => {
    return await axiosInstance.put(`/property/${id}`, updatedData);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['myProperties', user?.email]);
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Property has been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
    navigate('/dashboard/myAddedProperties');
  }
});

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-[50%]  mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-700">Update Property</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Title */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <Home className="w-5 h-5 mr-2 text-indigo-500" />
            Property Title
          </span>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter property title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </label>

        {/* Location */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
            Location
          </span>
          <input
            {...register("location")}
            type="text"
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </label>

        {/* Price */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-500" />
            Price Range
          </span>
          <input
            {...register("price")}
            type="text"
            placeholder="Enter price range"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </label>

        {/* User Name (readonly) */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <User className="w-5 h-5 mr-2 text-indigo-500" />
            Agent Name
          </span>
          <input
            value={user?.displayName || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>

        {/* User Email (readonly) */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <User className="w-5 h-5 mr-2 text-indigo-500" />
            Agent Email
          </span>
          <input
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>

        {/* Image URL */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <ImageIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Image URL
          </span>
          <input
            {...register("imageUrl")}
            type="url"
            placeholder="Enter image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          {updateMutation.isLoading ? 'Updating...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
