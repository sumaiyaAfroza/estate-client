import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loadingAccept, setLoadingAccept] = useState(null);
  const [loadingReject, setLoadingReject] = useState(null);

  const { data: offers = [], isLoading, refetch } = useQuery({
    queryKey: ["requestedOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAccept = async (offerId, propertyId) => {
    setLoadingAccept(offerId);
    try {
      await axiosSecure.patch(`/offers/accept/${offerId}`, { propertyId });
      refetch();
    } catch (error) {
    } finally {
      setLoadingAccept(null);
    }
  };

  const handleReject = async (offerId) => {
    setLoadingReject(offerId);
    try {
      await axiosSecure.patch(`/offers/reject/${offerId}`);
      refetch();
    } catch (error) {
    } finally {
      setLoadingReject(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fc] min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📦 Requested Properties</h2>
        <p className="text-gray-500 mt-1">Offers received from buyers.</p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-lg">No offers received yet.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-blue-400 text-white">
              <tr>
                <th className="px-6 py-3">🏠 Title</th>
                <th className="px-6 py-3">📍 Location</th>
                <th className="px-6 py-3">👤 Buyer</th>
                <th className="px-6 py-3">📧 Buyer Email</th>
                <th className="px-6 py-3">💰 Offer Amount</th>
                <th className="px-6 py-3">📅 Buying Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id} className="even:bg-gray-300 hover:bg-indigo-100 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{offer.title}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.location}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.buyerName}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.buyerEmail}</td>
                  <td className="px-6 py-4 font-bold text-indigo-700">৳ {offer.offerAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.buyingDate || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`capitalize font-semibold ${
                      offer.status === "pending"
                        ? "text-yellow-500"
                        : offer.status === "accepted"
                        ? "text-green-600"
                        : offer.status === "rejected"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {offer.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(offer._id, offer.propertyId)}
                          disabled={loadingAccept === offer._id}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-50"
                        >
                          {loadingAccept === offer._id ? '...' : 'Accept'}
                        </button>
                        <button
                          onClick={() => handleReject(offer._id)}
                          disabled={loadingReject === offer._id}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-50"
                        >
                          {loadingReject === offer._id ? '...' : 'Reject'}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-xs">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;
