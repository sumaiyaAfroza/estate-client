import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-hot-toast';
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
  const { register, handleSubmit, reset, setValue } = useForm();
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/property/${id}`);
      return res.data;
    }
  });

  // Reset form when property loads
  useEffect(() => {
    if (property) {
      reset({
        title: property.title,
        location: property.location,
        type: property.type || 'house',
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || 0,
        description: property.description || '',
        imageUrl: property.imageUrl || property.mainImage || '',
      });
      setCurrentImage(property.imageUrl || property.mainImage || '');
    }
  }, [property, reset]);

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
    },
    onError: () => {
      toast.error('Failed to update property');
    }
  });

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      let finalImageUrl = currentImage;

      // If user uploaded a new image
      const imageFile = data.newImage?.[0];
      if (imageFile) {
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        const result = await res.json();
        if (result.success) {
          finalImageUrl = result.data.url;
          setCurrentImage(result.data.url);
        }
      }

      const updateData = {
        title: data.title,
        location: data.location,
        type: data.type,
        bedrooms: Number(data.bedrooms) || 0,
        bathrooms: Number(data.bathrooms) || 0,
        area: Number(data.area) || 0,
        description: data.description,
        imageUrl: finalImageUrl,
      };

      updateMutation.mutate(updateData);
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!property) return <p className="text-center mt-10">Property not found.</p>;

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

        {/* Type */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <Home className="w-5 h-5 mr-2 text-indigo-500" />
            Property Type
          </span>
          <select
            {...register("type")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
            <option value="villa">Villa</option>
          </select>
        </label>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="flex items-center text-gray-700 mb-1 font-medium">
              <Home className="w-5 h-5 mr-2 text-indigo-500" />
              Bedrooms
            </span>
            <input
              {...register("bedrooms")}
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <label className="block">
            <span className="flex items-center text-gray-700 mb-1 font-medium">
              <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
              Bathrooms
            </span>
            <input
              {...register("bathrooms")}
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
        </div>

        {/* Area */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-500" />
            Area (sq ft)
          </span>
          <input
            {...register("area")}
            type="number"
            placeholder="Enter area in sq ft"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        {/* Description */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <ImageIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Description
          </span>
          <textarea
            {...register("description")}
            placeholder="Enter property description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24"
          />
        </label>

        {/* Current Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Current Image</label>
          <img
            src={currentImage}
            alt="Property"
            className="w-full h-48 object-cover rounded-md mb-2"
          />
        </div>

        {/* New Image Upload */}
        <label className="block">
          <span className="flex items-center text-gray-700 mb-1 font-medium">
            <ImageIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Upload New Image (optional)
          </span>
          <input
            {...register("newImage")}
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updateMutation.isLoading || uploading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          {updateMutation.isLoading || uploading ? 'Updating...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
