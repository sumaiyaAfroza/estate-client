import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { 
  Star, 
  Trash2, 
  Search, 
  Filter, 
  MessageSquare, 
  User, 
  Calendar,
  MapPin,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import useAxios from "../../../hooks/useAxios";

const ManageReviews = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axios.get("/allReviews");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Review deleted successfully");
      queryClient.invalidateQueries(["all-reviews"]);
      setShowModal(false);
    },
    onError: () => {
      toast.error("❌ Failed to delete review");
    },
  });

  const handleDelete = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedReview) {
      deleteMutation.mutate(selectedReview._id);
    }
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => 
      review.reviewer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        case "oldest":
          return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return (a.reviewer || "").localeCompare(b.reviewer || "");
        default:
          return 0;
      }
    });

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <Star
  //       key={index}
  //       className={`w-5 h-5 ${
  //         index < (rating || 0)
  //           ? "text-yellow-400 fill-current"
  //           : "text-gray-300"
  //       }`}
  //     />
  //   ));
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="py-7 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                Review Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">Monitor and manage customer reviews</p>
            </div>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Refresh reviews"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
          <div className="bg-white rounded-2xl shadow border p-6 flex items-center gap-5">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-3xl font-extrabold text-gray-900">{reviews.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow border p-6 flex items-center gap-5">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Star className="w-7 h-7 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {reviews.length > 0 
                  ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
                  : "0.0"
                }
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow border p-6 flex items-center gap-5">
            <div className="p-3 bg-green-100 rounded-xl">
              <User className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Reviewers</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {new Set(reviews.map(r => r.email)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow border mb-8">
          <div className="p-6 flex flex-col sm:flex-row gap-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search reviews by name, email, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-800"
                aria-label="Search reviews"
              />
            </div>
            
            <div className="sm:w-56 relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-14 pr-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white text-gray-800"
                aria-label="Sort reviews"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rating</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-indigo-100 rounded-2xl shadow border">
            <div className="text-center py-16 px-6">
              <MessageSquare className="mx-auto h-14 w-14 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No reviews found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search criteria.' 
                  : 'No reviews have been submitted yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-indigo-100 rounded-2xl shadow border hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Review Header */}
                <div className="p-6 pb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xl select-none">
                      {review.reviewer?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.reviewer || 'Anonymous'}
                      </h3>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{review.email}</p>
                    </div>
                  </div>
{/*                   
                  {review.rating && (
                    <div className="flex items-center gap-1 text-yellow-500 select-none">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        ({review.rating}/5)
                      </span>
                    </div>
                  )} */}
                </div>

                {/* Review Content */}
                <div className="px-8 mb-4 flex-grow">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {truncateText(review.comment)}
                  </p>
                </div>

                {/* Review Meta */}
                <div className="px-8 flex items-center justify-between text-xs text-gray-500 mb-4 select-none">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(review.createdAt || review.date)}
                  </div>
                  {review.propertyTitle && (
                    <div className="flex items-center gap-1 max-w-[120px] truncate">
                      <MapPin className="w-4 h-4" />
                      <span>{review.propertyTitle}</span>
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="border-t bg-gray-50 px-6 py-4">
                  <button
                    onClick={() => handleDelete(review)}
                    disabled={deleteMutation.isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Delete review by ${review.reviewer}`}
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && selectedReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 id="modal-title" className="text-2xl font-bold text-gray-900">
                  Delete Review
                </h3>
              </div>
              
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Are you sure you want to delete this review by{" "}
                <span className="font-semibold">{selectedReview.reviewer || "Anonymous"}</span>?
                This action cannot be undone.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-5 mb-8">
                <p className="text-sm text-gray-800 italic whitespace-pre-wrap">
                  "{truncateText(selectedReview.comment, 100)}"
                </p>
              </div>
              
              <div className="flex gap-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isLoading}
                  className="flex-1 px-6 py-3 text-base font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;





// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { 
//   Star, 
//   Trash2, 
//   Search, 
//   Filter, 
//   MessageSquare, 
//   User, 
//   Calendar,
//   Eye,
//   EyeOff,
//   AlertTriangle,
//   RefreshCw,
//   ChefHat,
//   MapPin
// } from "lucide-react";
// import useAxios from "../../../hooks/useAxios";

// const ManageReviews = () => {
//   const axios = useAxios();
//   const queryClient = useQueryClient();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const { data: reviews = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-reviews"],
//     queryFn: async () => {
//       const res = await axios.get("/allReviews");
//       return res.data;
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axios.delete(`/reviews/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("✅ Review deleted successfully");
//       queryClient.invalidateQueries(["all-reviews"]);
//       setShowModal(false);
//     },
//     onError: () => {
//       toast.error("❌ Failed to delete review");
//     },
//   });

//   const handleDelete = (review) => {
//     setSelectedReview(review);
//     setShowModal(true);
//   };

//   const confirmDelete = () => {
//     if (selectedReview) {
//       deleteMutation.mutate(selectedReview._id);
//     }
//   };

//   // Filter and sort reviews
//   const filteredReviews = reviews
//     .filter(review => 
//       review.reviewer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "newest":
//           return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
//         case "oldest":
//           return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
//         case "rating":
//           return (b.rating || 0) - (a.rating || 0);
//         case "name":
//           return (a.reviewer || "").localeCompare(b.reviewer || "");
//         default:
//           return 0;
//       }
//     });

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < (rating || 0)
//             ? "text-yellow-400 fill-current"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric"
//     });
//   };

//   const truncateText = (text, maxLength = 150) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading reviews...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                   <MessageSquare className="w-7 h-7 text-blue-600" />
//                   Review Management
//                 </h1>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Monitor and manage customer reviews
//                 </p>
//               </div>
//               <button
//                 onClick={() => refetch()}
//                 className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <MessageSquare className="w-6 h-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Reviews</p>
//                 <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <Star className="w-6 h-6 text-yellow-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Average Rating</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {reviews.length > 0 
//                     ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
//                     : "0.0"
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <User className="w-6 h-6 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Unique Reviewers</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {new Set(reviews.map(r => r.email)).size}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border mb-6">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search reviews by name, email, or comment..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:w-48">
//                 <div className="relative">
//                   <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
//                   >
//                     <option value="newest">Newest First</option>
//                     <option value="oldest">Oldest First</option>
//                     <option value="rating">Highest Rating</option>
//                     <option value="name">Name A-Z</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Grid */}
//         {filteredReviews.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border">
//             <div className="text-center py-12">
//               <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {searchTerm 
//                   ? 'Try adjusting your search criteria.' 
//                   : 'No reviews have been submitted yet.'}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredReviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
//               >
//                 {/* Review Header */}
//                 <div className="p-6 pb-4">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
//                         {review.reviewer?.charAt(0)?.toUpperCase() || 'U'}
//                       </div>
//                       <div>
//                         <h3 className="text-sm font-semibold text-gray-900">
//                           {review.reviewer || 'Anonymous'}
//                         </h3>
//                         <p className="text-xs text-gray-500">{review.email}</p>
//                       </div>
//                     </div>
                    
//                     {review.rating && (
//                       <div className="flex items-center gap-1">
//                         {renderStars(review.rating)}
//                         <span className="ml-1 text-sm text-gray-600">
//                           ({review.rating}/5)
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Review Content */}
//                   <div className="mb-4">
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                       {truncateText(review.comment)}
//                     </p>
//                   </div>

//                   {/* Review Meta */}
//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3" />
//                       {formatDate(review.createdAt || review.date)}
//                     </div>
//                     {review.propertyTitle && (
//                       <div className="flex items-center gap-1">
//                         <MapPin className="w-3 h-3" />
//                         <span className="truncate max-w-24">{review.propertyTitle}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Action Footer */}
//                 <div className="border-t bg-gray-50 px-6 py-3">
//                   <button
//                     onClick={() => handleDelete(review)}
//                     disabled={deleteMutation.isLoading}
//                     className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showModal && selectedReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-red-100 rounded-lg">
//                   <AlertTriangle className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Delete Review
//                 </h3>
//               </div>
              
//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to delete this review by{" "}
//                 <span className="font-medium">{selectedReview.reviewer}</span>?
//                 This action cannot be undone.
//               </p>
              
//               <div className="bg-gray-50 rounded-lg p-3 mb-6">
//                 <p className="text-sm text-gray-700 italic">
//                   "{truncateText(selectedReview.comment, 100)}"
//                 </p>
//               </div>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   disabled={deleteMutation.isLoading}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {deleteMutation.isLoading ? "Deleting..." : "Delete"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageReviews;