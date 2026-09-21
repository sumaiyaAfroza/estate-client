import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { X, Trash2, MapPin, Home, DollarSign, Bed, Bath, Square } from "lucide-react";

const CompareProperties = () => {
  const axiosInstance = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const [compareList, setCompareList] = useState([]);

  // Get property IDs from URL params
  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",") || [];
    if (ids.length > 0) {
      fetchProperties(ids);
    }
  }, [searchParams]);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["compare-properties"],
    queryFn: async () => {
      const ids = searchParams.get("ids")?.split(",") || [];
      if (ids.length === 0) return [];
      // Fetch each property individually
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await axiosInstance.get(`/properties/${id}`);
          return res.data;
        })
      );
      return results.filter(Boolean);
    },
    enabled: false,
  });

  const fetchProperties = async (ids) => {
    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          const res = await axiosInstance.get(`/properties/${id}`);
          return res.data;
        } catch {
          return null;
        }
      })
    );
    setCompareList(results.filter(Boolean));
  };

  const removeFromCompare = (id) => {
    const updated = compareList.filter(p => p._id !== id);
    setCompareList(updated);
    const newIds = updated.map(p => p._id).join(",");
    setSearchParams(newIds ? { ids: newIds } : {});
  };

  const clearAll = () => {
    setCompareList([]);
    setSearchParams({});
  };

  const features = [
    { label: "Title", key: "title", icon: <Home size={16} /> },
    { label: "Location", key: "location", icon: <MapPin size={16} /> },
    { label: "Type", key: "type", icon: <Home size={16} /> },
    { label: "Price Min", key: "priceMin", render: (v) => v ? `৳${Number(v).toLocaleString()}` : "-" },
    { label: "Price Max", key: "priceMax", render: (v) => v ? `৳${Number(v).toLocaleString()}` : "-" },
    { label: "Bedrooms", key: "bedrooms", icon: <Bed size={16} /> },
    { label: "Bathrooms", key: "bathrooms", icon: <Bath size={16} /> },
    { label: "Area (sq ft)", key: "area", icon: <Square size={16} /> },
    { label: "Status", key: "status", icon: null },
    { label: "Agent", key: "agentName", icon: null },
  ];

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <Home size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Properties to Compare</h2>
          <p className="text-gray-500 mb-6">Select properties from the All Properties page and click the compare button.</p>
          <Link to="/allProperties" className="btn btn-primary">Browse Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🔄 Property Comparison</h1>
          <button onClick={clearAll} className="btn btn-error btn-sm flex items-center gap-2">
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4 text-left text-gray-500 dark:text-gray-400 w-32 sticky left-0 bg-white dark:bg-gray-800 z-10">Feature</th>
                {compareList.map((prop) => (
                  <th key={prop._id} className="p-4 text-center min-w-[200px]">
                    <div className="relative">
                      <img
                        src={prop.imageUrls?.[0] || prop.imageUrl}
                        alt={prop.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <button
                        onClick={() => removeFromCompare(prop._id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-white text-base">{prop.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{prop.location}</p>
                    <p className="font-bold text-emerald-600 mt-1">
                      ৳{prop.price?.min?.toLocaleString()} – {prop.price?.max?.toLocaleString()}
                    </p>
                    <Link
                      to={`/propertyDetails/${prop._id}`}
                      className="btn btn-xs btn-primary mt-2"
                    >
                      View Details
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, idx) => (
                <tr key={feat.key} className={`border-b dark:border-gray-700 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                  <td className="p-3 font-medium text-gray-600 dark:text-gray-300 sticky left-0 bg-inherit z-10 flex items-center gap-2">
                    {feat.icon && <span className="text-blue-500">{feat.icon}</span>}
                    {feat.label}
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop._id} className="p-3 text-center text-gray-800 dark:text-gray-200">
                      {feat.render ? feat.render(prop[feat.key]) : (prop[feat.key] || "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareProperties;
