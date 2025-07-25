import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      const wishlistData = {
        propertyId: id,
        title: property.title,
        imageUrl: property.imageUrl,
        location: property.location,
        price: property.price,
        status: property.status,
        AgentName: property.agentName,
        AgentEmail: property.agentEmail,
        AgentImage: property.agentImage,
        userEmail: user.email,
      };
      return await axiosSecure.post("/wishlist", wishlistData);
    },
    onSuccess: () => toast.success("Added to wishlist!"),
    onError: () => toast.error("Already added to wishlist"),
  });

  const reviewMutation = useMutation({
    mutationFn: async (comment) => {
      const reviewData = {
        propertyId: id,
        propertyTitle: property.title,
        agentName: property.agentName,
        reviewer: user.displayName,
        email: user.email,
        reviewerImage: user.photoURL,
        comment,
        rating: 5,
        date: new Date(),
      };
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(["reviews", id]);
      setShowModal(false);
    },
    onError: () => toast.error("Failed to add review"),
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.review.value;
    reviewMutation.mutate(comment);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-md mt-6">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {property.title}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{property.location}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Price Range</h3>
            <p className="text-2xl font-bold text-primary">
              ৳{property.price?.min} - ৳{property.price?.max}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Status</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.status === "For Sale"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
              }`}
            >
              {property.status}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300">{property.description}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Agent Information</h3>
          <div className="flex items-center">
            <img
              src={property.agentImage}
              alt={property.agentName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{property.agentName}</h4>
              <p className="text-gray-600 dark:text-gray-400">{property.agentEmail}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => wishlistMutation.mutate()}
          disabled={wishlistMutation.isLoading}
          className="btn btn-primary gap-2 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700"
        >
          {wishlistMutation.isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
          Add to Wishlist
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-secondary gap-2 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Write a Review
        </button>
      </div>

      <div className="border-t pt-6 border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <img
                    src={review.reviewerImage || "/default-avatar.jpg"}
                    alt={review.reviewer}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{review.reviewer}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Write a Review</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <textarea
                  name="review"
                  className="textarea textarea-bordered w-full h-32 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Share your experience with this property..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary dark:bg-blue-600 dark:border-blue-600"
                  disabled={reviewMutation.isLoading}
                >
                  {reviewMutation.isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
