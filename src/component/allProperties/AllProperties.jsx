import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

const AllProperties = () => {
  const axiosInstance = useAxios();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allProperties");
      return res.data;
    },
  });

  // ✅ Filter only verified properties and by location
  const filteredProperties = properties
    .filter(
      (property) =>
        property.verified === true &&
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price.min - b.price.min;
      if (sortOrder === "desc") return b.price.max - a.price.max;
      return 0;
    });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="px-10">
      <h1 className="text-5xl font-bold text-center mt-20 mb-20   bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"> Find Your Perfect Property</h1>
      {/* 🔍 Search and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location"
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 📦 Property Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16 gap-6">
  {filteredProperties.map((property) => (
    <div 
      key={property._id} 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
    >
      {/* Image with Actions */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
            property.status === 'For Sale' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {property.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* Views Counter - if available */}
        {property.views && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 rounded-lg backdrop-blur-sm">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs text-white font-medium">{property.views}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-bold mb-2 text-slate-800 dark:text-white line-clamp-1">
          {property.title}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-slate-600 dark:text-slate-400">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm truncate">{property.location}</span>
        </div>

        {/* Property Features - if available */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {property.bedrooms && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{property.area}</span>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Price Range</span>
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-white">
            ৳ {property.price.min} - {property.price.max}
          </p>
        </div>

        {/* Agent Info */}
        <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <img
            src={property.agentImage}
            alt="agent"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
              {property.agentName}
            </p>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-slate-500 dark:text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {property.agentEmail}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/propertyDetails/${property._id}`}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
        >
          <span className="text-sm">View Details</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  ))}
</div>
      


      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16 gap-6">
        {filteredProperties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-md p-4">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{property.title}</h2>

            <p className="text-sm dark:text-white  text-gray-600 mb-1">
              <span className="  font-medium">Location:</span> {property.location}
            </p>

            <div className="flex flex-col  gap-2 mb-1">
              <img
                src={property.agentImage}
                alt="agent"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm">Agent: {property.agentName}</span>
              <span className="text-sm">Email: {property.agentEmail}</span>
            </div>

            <p>
              💰 {property.price.min} - {property.price.max} ৳
            </p>

            <p className="text-sm mb-4 gap-2 ">
              <span className="font-medium text-lg ">Status:</span> <span className=" border-2 rounded-2xl bg-green-100 dark:bg-[#1E2939]  px-2">{property.status}</span>
            </p>

            <Link
              to={`/propertyDetails/${property._id}`}
              className="btn text-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white w-full "
            >
             view Details
            </Link>
          </div>
        ))}
      </div> */}



    </div>
  );
};

export default AllProperties;