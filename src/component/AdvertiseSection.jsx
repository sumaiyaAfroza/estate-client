import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { BadgeCheck, MapPin, DollarSign, Eye } from "lucide-react";

const AdvertiseSection = () => {
  const axios = useAxios();

  const { data: advertisedProperties = [] } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await axios.get("/propertiess/advertised");
      return res.data;
    },
  });

  console.log(advertisedProperties);

  if (advertisedProperties.length === 0) return null;

  return (
    <div className="p-4 mt-20 mx-26">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 text-center">
        Featured Advertisements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advertisedProperties.slice(0, 4).map((property) => (
          <div
            key={property._id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <img
              src={property.imageUrl || property.image}
              alt={property.title}
              className="w-full h-44 object-cover rounded-t-2xl"
            />
            <div className="p-4 space-y-2 flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {property.title}
                </h3>
                {property.verified ? (
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                ) : (
                  <BadgeCheck className="w-5 h-5 text-gray-400 line-through" />
                )}
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400 gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300 gap-1 text-sm">
                <span>
                  ৳{property.price}
                </span>
              </div>

              <div className="mt-auto flex justify-center">
                <Link
                  to={`/propertyDetails/${property._id}`}
                  className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition"
                >
                  <Eye className="w-4 h-4" /> View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertiseSection;

// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import useAxios from "../hooks/useAxios";
// import { BadgeCheck, MapPin, DollarSign, Eye } from "lucide-react";

// const AdvertiseSection = () => {
//   const axios = useAxios();

//   const { data: advertisedProperties = [] } = useQuery({
//     queryKey: ["advertisedProperties"],
//     queryFn: async () => {
//       const res = await axios.get("/propertiess/advertised");
//       return res.data;
//     },
//   });

//   console.log(advertisedProperties);

//   if (advertisedProperties.length === 0) return null;

//   return (
//     <div className="p-4 mt-20  mx-26">
//       <h2 className="text-4xl  font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent  mb-6 text-center">
//        Featured Advertisements
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {advertisedProperties.slice(0, 4).map((property) => (
//           <div
//             key={property._id}
//             className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-xl transition-all duration-300"
//           >
//             <img
//               src={property.imageUrl || property.image}
//               alt={property.title}
//               className="w-full h-44 object-cover rounded-t-2xl"
//             />
//             <div className="p-4 space-y-2 flex flex-col h-full">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {property.title}
//                 </h3>
//                 {property.verified ? (
//                   <BadgeCheck className="w-5 h-5 text-green-500" />
//                 ) : (
//                   <BadgeCheck className="w-5 h-5 text-gray-400 line-through" />
//                 )}
//               </div>

//               <div className="flex items-center text-gray-600 dark:text-gray-400 gap-1 text-sm">
//                 <MapPin className="w-4 h-4" />
//                 <span>{property.location}</span>
//               </div>

//               <div className="flex items-center text-gray-700 dark:text-gray-300 gap-1 text-sm">
//                 <span>
//                   {/* ৳{property.price?.min} - ৳{property.price?.max} */}
//                   ৳{property.price}
//                 </span>
//               </div>

//               <div className="flex justify-center mt-4">
//                 <Link
//                   to={`/propertyDetails/${property._id}`}
//                   className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition"
//                 >
//                   <Eye className="w-4 h-4" /> View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdvertiseSection;
