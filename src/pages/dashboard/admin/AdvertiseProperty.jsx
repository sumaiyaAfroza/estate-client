import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";

const AdvertiseProperty = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get all properties
  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allProperties");
      return res.data;
    },
  });


  // ✅ Filter only verified properties
  const verifiedProperties = allProperties.filter((property) => property.verified === true);

  // ✅ Mutation to advertise a property
  const advertiseMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/advertise/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verifiedProperties"]);
      Swal.fire("Advertised!", "Property has been advertised.", "success");
    },
  });

  if (isLoading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Advertise Verified Properties</h2>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price Range</th>
              <th className="px-6 py-3 text-left">Agent Name</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
            {verifiedProperties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{property.title}</td>
                <td className="px-6 py-4">{property.price.min} - {property.price.max} ৳</td>
                <td className="px-6 py-4">{property.agentName}</td>
                <td className="px-6 py-4">
                  {property.isAdvertised ? (
                    <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 font-medium rounded">
                      ✅ Advertised
                    </span>
                  ) : (
                    <button
                      onClick={() => advertiseMutation.mutate(property._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      Advertise
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
