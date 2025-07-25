import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import useAxios from "../hooks/useAxios";

const LatestReview = () => {
  const axios = useAxios();

  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axios.get("/reviews/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-error">
        Failed to load reviews. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          What Our Users Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={review.reviewerImage || "/default-avatar.jpg"}
                    alt={review.reviewer}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    {review.reviewer}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Property Info */}
              <div className="mb-3">
                <span className="text-sm font-medium text-primary dark:text-indigo-400">
                  {review.propertyTitle}
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 mb-4">
                "{review.comment}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Rated {review.rating}/5
                </span>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No reviews available yet.
          </div>
        )}
      </section>
    </div>
  );
};

export default LatestReview;
