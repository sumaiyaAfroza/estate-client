import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const navigate = useNavigate();
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { data: property, isLoading, isError } = useQuery({
  queryKey: ["property", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/wishlistProperty/${id}`);
    console.log(res.data);
    if (!res.data) {
      throw new Error('Property not found');
    }
    return res.data;
  },
});

 console.log(property);

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Error loading property details</p>;
if (!property) return <p>Property not found</p>;



 

 

  if (isLoading) return <p>Loading...</p>;

  // const onSubmit = async (data) => {
  //   const offerAmount = parseFloat(data.offerAmount);
  //   const min = property.price.min;
  //   const max = property.price.max;

  //   if (offerAmount < min || offerAmount > max) {
  //     toast.error(`Offer must be between ${min} - ${max} ৳`);
  //     return;
  //   }

  //   const offerData = {
  //     propertyId: property._id,
  //     title: property.title,
  //     location: property.location,
  //     agentName: property.AgentName,
  //     agentEmail: property.AgentEmail,
  //     buyerName: user.displayName,
  //     buyerEmail: user.email,
  //     buyerImage: user.photoURL,
  //     offerAmount,
  //     buyingDate: data.buyingDate,
  //     status: "pending",
  //   };
  //   console.log(offerData);

  //   const res = await axiosSecure.post("/offers", offerData);
  //   console.log(res);
  //   if (res.data.insertedId) {
  //     toast.success("Offer placed successfully!");
  //     navigate("/myBoughtProperties");
  //   }
  // };
const onSubmit = async (data) => {
  const offerAmount = parseFloat(data.offerAmount);
  const min = property.price.min;
  const max = property.price.max;

  if (offerAmount < min || offerAmount > max) {
    toast.error(`Offer must be between ${min} - ${max} ৳`);
    return;
  }

  const offerData = {
    propertyId: property._id,

    PropertyImage: property.imageUrl,

    title: property.title,
    location: property.location,
    agentName: property.agentName,
    agentEmail: property.agentEmail,
    buyerName: user.displayName,
    buyerEmail: user.email,
    buyerImage: user.photoURL,
    buyerRole: "user", // Add this line
    offerAmount,
    minPrice: min, // Send as minPrice
    maxPrice: max, // Send as maxPrice
    buyingDate: data.buyingDate,
    status: "pending",
  };
  console.log(offerData);

  try {
    const res = await axiosSecure.post("/offers", offerData);
    if (res.data.insertedId) {
      toast.success("Offer placed successfully!");
      navigate("/dashboard/propertyBought");
    } else {
      toast.error("Failed to place offer");
    }
  } catch (error) {
    console.error("Offer submission error:", error);
    toast.error(error.response?.data?.message || "Failed to place offer");
  }
};
  
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label>Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Offer Amount (Between {property.price.min} - {property.price.max})</label>
          <input
            type="number"
            {...register("offerAmount", { required: "Offer amount is required" })}
            className="input input-bordered w-full"
          />
          {errors.offerAmount && <p className="text-red-500">{errors.offerAmount.message}</p>}
        </div>

        <div>
          <label>buyer Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>buyer Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        

        <div>
          <label>Buying Date</label>
          <input
            type="date"
            {...register("buyingDate", { required: "Buying date is required" })}
            className="input input-bordered w-full"
          />
          {errors.buyingDate && <p className="text-red-500">{errors.buyingDate.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Offer</button>
      </form>
    </div>
  );
};

export default MakeOffer;
