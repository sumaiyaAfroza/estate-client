import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔹 Fetch all reviews given by this user
  const { data: myReviews = [], refetch } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myReviews?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔹 Mutation to delete a review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your review has been removed.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Oops!", "Something went wrong!", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {myReviews.length === 0 ? (
        <p>You haven’t added any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {myReviews.map((review) => (

            <div key={review._id} className="border rounded-md p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{review.propertyTitle}</h3>
                  <p className="text-sm text-gray-600">Agent Name: {review.agentName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </div>
              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
