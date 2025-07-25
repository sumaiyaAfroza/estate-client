import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?agentEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalSoldAmount = soldProperties.reduce((sum, property) => sum + property.offerAmount, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">Loading sold properties...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fc] min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📦 My Sold Properties</h2>
        <p className="text-gray-500 mt-1">List of all your completed property sales.</p>
      </div>

      {/* Total Sold Amount Box */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium"> 💰  Total Sold Amount</h3>
          <p className="text-3xl font-bold mt-1">৳ {totalSoldAmount.toLocaleString()}</p>
        </div>
        <div className="text-4xl">💸</div>
      </div>

      {soldProperties.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-lg">No properties have been sold yet.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-blue-400 text-white">
              <tr>
                <th className="px-6 py-3">🏠 Title</th>
                <th className="px-6 py-3">📍 Location</th>
                <th className="px-6 py-3">📧 Buyer Email</th>
                <th className="px-6 py-3">👤 Buyer Name</th>
                <th className="px-6 py-3">💰 Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((property) => (
                <tr key={property._id} className="even:bg-gray-300 hover:bg-indigo-100 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{property.title}</td>
                  <td className="px-6 py-4 text-gray-700">{property.location}</td>
                  <td className="px-6 py-4 text-gray-700">{property.buyerEmail}</td>
                  <td className="px-6 py-4 text-gray-700">{property.buyerName}</td>
                  <td className="px-6 py-4 font-bold text-indigo-700">৳ {property.offerAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;