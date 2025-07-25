import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["myOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user?.email}&role=user`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  
  console.log(offers);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Property Offers</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="border rounded-2xl shadow-md p-4 space-y-3"
          >
            <img
              src={offer.PropertyImage
}
              alt={offer.propertyTitle}
              className="h-48 w-full object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold">Title: {offer.title}</h3>
            <p className="text-gray-600">Location: {offer.location}</p>
            <p>
              <span className="font-medium">Agent:</span> {offer.agentName}
            </p>
            <p>
              <span className="font-medium">Offered Amount:</span> ${offer.offerAmount}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`capitalize font-semibold ${
                  offer.status === "pending"
                    ? "text-yellow-500"
                    : offer.status === "accepted"
                    ? "text-blue-500"
                    : offer.status === "bought"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {offer.status}
              </span>
            </p>

            {offer.status === "accepted" && (
              <Link
                to={`/dashboard/payment/${offer.propertyId}/${offer._id}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Pay
              </Link>
            )}

            {offer.status === "bought" && offer.transactionId && (
              <p className="text-sm text-green-700 font-semibold">
                Payment ID: <code>{offer.transactionId}</code>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;