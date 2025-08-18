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
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;