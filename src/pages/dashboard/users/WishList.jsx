import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WishList = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });
  console.log(wishlist);

  const handleRemove = async (id) => {
    const res = await axiosSecure.delete(`/wishlist/${id}`);
    if (res.data.deletedCount > 0) {
      Swal.fire("Removed", "Property removed from wishlist", "success");
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="p-4 border rounded-xl shadow-md">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p>📍 {item.location}</p>
            <p>
              Agent: <img src={item.AgentImage} className="inline w-6 h-6 rounded-full" /> {item.AgentName}
            </p>
            <p>✅ Status: {item.status}</p>
            <p className="text-2xl font-bold text-primary">
              ৳{item.price.min} - ৳
              {item.price.max}
            </p>
            {/* <p>💰 Price Range: {item.price}</p> */}
            <div className="flex gap-4 mt-3">
              <Link to={`/makeOffer/${item.propertyId}`} className="btn btn-primary btn-sm">
                Make an Offer
              </Link>
              <button onClick={() => handleRemove(item._id)} className="btn btn-error btn-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
