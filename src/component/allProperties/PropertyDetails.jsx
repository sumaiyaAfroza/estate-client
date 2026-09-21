import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import PropertyMap from "../PropertyMap";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Increment view counter on page load
  useEffect(() => {
    if (id) {
      axiosSecure.post(`/properties/${id}/views`).catch(() => {});
    }
  }, [id]);

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
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.response?.statusText;
      if (msg?.includes("already") || error?.response?.status === 409) {
        toast.error("Already added to wishlist");
      } else {
        toast.error("Failed to add to wishlist. Please try again.");
      }
    },
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
        rating,
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
      {/* Image Gallery */}
      <div className="mb-6">
        <img
          src={property.imageUrls?.[0] || property.imageUrl}
          alt={property.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        {property.imageUrls?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {property.imageUrls.slice(1).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Gallery ${idx}`}
                className="w-32 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>

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

        {/* Features Row */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex flex-wrap gap-4 mb-4">
            {property.bedrooms && (
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                🛏 {property.bedrooms} Bedrooms
              </span>
            )}
            {property.bathrooms && (
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                🚿 {property.bathrooms} Bathrooms
              </span>
            )}
            {property.area && (
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                📐 {property.area} sq ft
              </span>
            )}
            {property.type && (
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                🏠 {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Price Range</h3>
            <p className="text-2xl font-bold text-primary">
              ৳{property.price?.min?.toLocaleString()} - ৳{property.price?.max?.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Status</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.status === "verified"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : property.status === "sold"
                  ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                  : property.status === "under-offer"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
              }`}
            >
              {property.status?.toUpperCase() || "Available"}
            </span>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">{property.description}</p>
          </div>
        )}

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
          className="btn bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white gap-2 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700"
        >
          {wishlistMutation.isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          Add to Wishlist
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="btn bg-blue-800 text-white gap-2 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Write a Review
        </button>
      </div>

      {/* Views Counter */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{property.views || 0} views</span>
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Location
        </h3>
        <PropertyMap latitude={property.latitude} longitude={property.longitude} title={property.title} />
      </div>

      {/* Appointment & Actions */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📅 Book a Visit</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/appointment/${id}`}
            className="btn bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule a Property Tour
          </Link>
          <a
            href={`mailto:${property.agentEmail}?subject=Inquiry about ${encodeURIComponent(property.title)}&body=Hi, I am interested in your property: ${property.title} at ${property.location}. Please contact me.`}
            className="btn btn-outline gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Agent
          </a>
        </div>
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
                    <div className="flex items-center gap-1 text-yellow-400">
                      {"★".repeat(review.rating || 5)}{"☆".repeat(5 - (review.rating || 5))}
                    </div>
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
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
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
