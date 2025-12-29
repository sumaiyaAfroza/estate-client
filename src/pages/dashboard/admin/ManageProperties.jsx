import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { CheckCircle, XCircle } from "lucide-react";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ["manageProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const verifyProperty = useMutation({
    mutationFn: async (propertyId) => {
      const res = await axiosSecure.patch(`/properties/verify/${propertyId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manageProperties"]);
      Swal.fire("Verified!", "Property has been verified.", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Failed to verify property", "error");
    }
  });

  const rejectProperty = useMutation({
    mutationFn: async (propertyId) => {
      const res = await axiosSecure.patch(`/properties/reject/${propertyId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manageProperties"]);
      Swal.fire("Rejected", "Property has been rejected.", "info");
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Failed to reject property", "error");
    }
  });

  if (isLoading)
    return (
      <div className="text-center py-12 text-xl font-semibold text-gray-600 animate-pulse">
        Loading properties...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-600 font-semibold">
        Error loading properties
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900 tracking-tight">
        Manage Properties
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg ring-1 ring-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-left">
            <tr>
              {["Title", "Location", "Agent", "Price", "Status", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-4 sm:px-6 py-3 font-semibold text-indigo-700 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-indigo-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">
                  {property.title}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700 max-w-[160px] truncate">
                  {property.location}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  <p className="font-medium truncate">{property.agentName}</p>
                  <p className="text-xs text-indigo-500 truncate max-w-[160px]">
                    {property.agentEmail}
                  </p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700 whitespace-nowrap">
                  ${property.price.min.toLocaleString()} - ${property.price.max.toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      property.status === "verified"
                        ? "bg-green-200 text-green-800"
                        : property.status === "rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {property.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {property.status === "pending" ? (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: 'Verify Property?',
                            text: "This property will be visible to all users.",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#059669',
                            cancelButtonColor: '#6B7280',
                            confirmButtonText: 'Yes, verify it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              verifyProperty.mutate(property._id);
                            }
                          });
                        }}
                        disabled={verifyProperty.isLoading}
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md text-white text-xs sm:text-sm font-semibold transition ${
                          verifyProperty.isLoading
                            ? "bg-green-300 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        <CheckCircle size={16} /> Verify
                      </button>

                      <button
                        onClick={() => {
                          Swal.fire({
                            title: 'Reject Property?',
                            text: "This property will be marked as rejected.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#DC2626',
                            cancelButtonColor: '#6B7280',
                            confirmButtonText: 'Yes, reject it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              rejectProperty.mutate(property._id);
                            }
                          });
                        }}
                        disabled={rejectProperty.isLoading}
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md text-white text-xs sm:text-sm font-semibold transition ${
                          rejectProperty.isLoading
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">No action</span>
                  )}
                </td>
              </tr>
            ))}

            {properties.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500 italic">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;  


// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { CheckCircle, XCircle } from "lucide-react";

// const ManageProperties = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const { data: properties = [], isLoading, error } = useQuery({
//     queryKey: ["manageProperties"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/properties");
//       return res.data;
//     },
//   });

//   const verifyProperty = useMutation({
//     mutationFn: async (propertyId) => {
//       const res = await axiosSecure.patch(`/properties/verify/${propertyId}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["manageProperties"]);
//       Swal.fire("Verified!", "Property has been verified.", "success");
//     },
//     onError: (error) => {
//       Swal.fire("Error", error.response?.data?.message || "Failed to verify property", "error");
//     }
//   });

//   const rejectProperty = useMutation({
//     mutationFn: async (propertyId) => {
//       const res = await axiosSecure.patch(`/properties/reject/${propertyId}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["manageProperties"]);
//       Swal.fire("Rejected", "Property has been rejected.", "info");
//     },
//     onError: (error) => {
//       Swal.fire("Error", error.response?.data?.message || "Failed to reject property", "error");
//     }
//   });

//   if (isLoading)
//     return (
//       <div className="text-center py-12 text-xl font-semibold text-gray-600 animate-pulse">
//         Loading properties...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="text-center py-12 text-red-600 font-semibold">
//         Error loading properties
//       </div>
//     );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">
//         Manage Properties
//       </h2>

//       <div className="overflow-x-auto bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
//             <tr>
//               {["Title", "Location", "Agent", "Price", "Status", "Actions"].map((head) => (
//                 <th
//                   key={head}
//                   className="px-7 py-4 text-left font-semibold text-indigo-700 tracking-wide select-none"
//                 >
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {properties.map((property) => (
//               <tr
//                 key={property._id}
//                 className="hover:bg-indigo-50 transition-colors duration-200"
//               >
//                 <td className="px-7 py-4 font-semibold text-gray-900 whitespace-nowrap max-w-xs truncate">
//                   {property.title}
//                 </td>
//                 <td className="px-7 py-4 text-gray-700 whitespace-nowrap max-w-xs truncate">
//                   {property.location}
//                 </td>
//                 <td className="px-7 py-4 text-gray-700 whitespace-nowrap max-w-xs">
//                   <p className="font-medium">{property.agentName}</p>
//                   <p className="text-xs text-indigo-500 truncate max-w-[160px]">{property.agentEmail}</p>
//                 </td>
//                 <td className="px-7 py-4 text-gray-700 whitespace-nowrap">
//                   ${property.price.min.toLocaleString()} - ${property.price.max.toLocaleString()}
//                 </td>
//                 <td className="px-7 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide select-none ${
//                       property.status === "verified"
//                         ? "bg-green-200 text-green-800"
//                         : property.status === "rejected"
//                         ? "bg-red-200 text-red-800"
//                         : "bg-yellow-200 text-yellow-800"
//                     }`}
//                   >
//                     {property.status}
//                   </span>
//                 </td>
//                 <td className="px-7 py-4 whitespace-nowrap">
//                   {property.status === "pending" ? (
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           Swal.fire({
//                             title: 'Verify Property?',
//                             text: "This property will be visible to all users.",
//                             icon: 'question',
//                             showCancelButton: true,
//                             confirmButtonColor: '#059669', // emerald-600
//                             cancelButtonColor: '#6B7280',
//                             confirmButtonText: 'Yes, verify it!'
//                           }).then((result) => {
//                             if (result.isConfirmed) {
//                               verifyProperty.mutate(property._id);
//                             }
//                           });
//                         }}
//                         disabled={verifyProperty.isLoading}
//                         className={`flex items-center gap-1 px-4 py-2 rounded-md text-white text-sm font-semibold transition 
//                           ${
//                             verifyProperty.isLoading
//                               ? "bg-green-300 cursor-not-allowed"
//                               : "bg-green-600 hover:bg-green-700"
//                           }`}
//                       >
//                         <CheckCircle size={18} /> Verify
//                       </button>

//                       <button
//                         onClick={() => {
//                           Swal.fire({
//                             title: 'Reject Property?',
//                             text: "This property will be marked as rejected.",
//                             icon: 'warning',
//                             showCancelButton: true,
//                             confirmButtonColor: '#DC2626', // red-600
//                             cancelButtonColor: '#6B7280',
//                             confirmButtonText: 'Yes, reject it!'
//                           }).then((result) => {
//                             if (result.isConfirmed) {
//                               rejectProperty.mutate(property._id);
//                             }
//                           });
//                         }}
//                         disabled={rejectProperty.isLoading}
//                         className={`flex items-center gap-1 px-4 py-2 rounded-md text-white text-sm font-semibold transition 
//                           ${
//                             rejectProperty.isLoading
//                               ? "bg-red-300 cursor-not-allowed"
//                               : "bg-red-600 hover:bg-red-700"
//                           }`}
//                       >
//                         <XCircle size={18} /> Reject
//                       </button>
//                     </div>
//                   ) : (
//                     <span className="text-gray-400 italic text-sm select-none">No action</span>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {properties.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="text-center py-12 text-gray-500 italic select-none"
//                 >
//                   No properties found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageProperties;
