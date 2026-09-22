import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyCard from "../../../component/PropertyCard";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    await axiosSecure.delete(`/wishlist/${id}`);
    Swal.fire("Removed", "Property removed from wishlist", "success");
    refetch();
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <p className="text-gray-500 text-lg">No saved properties yet.</p>
          <Link to="/allProperties" className="btn btn-primary mt-4">Browse Properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img
                src={item.imageUrl || item.imageUrls?.[0]}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">📍 {item.location}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Agent: {item.agentName || item.AgentName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">✅ Status: {item.status}</p>
                <p className="text-xl font-bold text-emerald-600 mt-2">
                  ৳{item.price?.min?.toLocaleString()} – ৳{item.price?.max?.toLocaleString()}
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/makeOffer/${item.propertyId}`}
                    className="btn btn-sm btn-primary flex-1"
                  >
                    Make an Offer
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
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

export default WishList;
