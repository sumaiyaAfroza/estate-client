import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, MapPin, DollarSign, User2 } from 'lucide-react';
import Swal from 'sweetalert2';

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['myProperties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAddedProperty?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/property/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myProperties', user?.email]);
    },
  });

  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(id);
      Swal.fire(
        'Deleted!',
        'Your property has been deleted.',
        'success'
      )
    }
  });
};


  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };

  if (isLoading) return <p className="text-center text-lg mt-20">Loading...</p>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f9fafb]">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">🏡 My Added Properties</h2>

      {properties.length === 0 ? (
        <p className="text-gray-500 text-center">You have not added any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-gradient-to-tr from-white via-blue-100 to-purple-50 
             rounded-2xl shadow-md hover:shadow-xl border border-gray-200 
             transition duration-300 transform hover:scale-105"
            >
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin size={16} color="#3B82F6" /> {property.location}
                </p>
                <p className="text-gray-700 flex items-center gap-1">
                  <DollarSign size={16} color="#10B981" /> {property.price.min} - {property.price.max} ৳
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <User2 size={15} color="#F59E0B" /> {user.displayName} ({user.email})
                </p>

                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold ${
                      property.status === 'pending'
                        ? 'bg-yellow-300 text-yellow-900'
                        : property.status === 'verified'
                        ? 'bg-green-200 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {property.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                  {property.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdate(property._id)}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-indigo-500 hover:bg-indigo-700 text-white py-1.5 rounded-md text-sm font-medium transition"
                    >
                      <Pencil size={16} color="white" /> Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-amber-700 hover:bg-rose-700 text-white py-1.5 rounded-md text-sm font-medium transition"
                  >
                    <Trash2 size={16} color="white" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;
