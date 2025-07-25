import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  Check, 
  X, 
  MapPin, 
  DollarSign, 
  User, 
  Mail, 
  Home, 
  Clock,
  CheckCircle,
  XCircle,
  ShoppingCart,
  RefreshCw,
  TrendingUp,
  Users,
  Building
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent?email=${user?.email}`);
      return res.data;
    },
  });

  const acceptOffer = useMutation({
    mutationFn: async ({ offerId, propertyId }) => {
      const res = await axiosSecure.patch(`/offers/accept/${offerId}`, { propertyId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers"]);
      Swal.fire({
        title: "Offer Accepted",
        text: "The offer has been successfully accepted",
        icon: "success",
        confirmButtonColor: "#10b981"
      });
    },
  });

  const rejectOffer = useMutation({
    mutationFn: async (offerId) => {
      const res = await axiosSecure.patch(`/offers/reject/${offerId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers"]);
      Swal.fire({
        title: "Offer Rejected",
        text: "The offer has been rejected",
        icon: "info",
        confirmButtonColor: "#6b7280"
      });
    },
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-rose-600" />;
      case "bought":
        return <ShoppingCart className="w-4 h-4 text-violet-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm";
    
    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-2 border-amber-200`}>
            {getStatusIcon(status)}
            Pending
          </span>
        );
      case "accepted":
        return (
          <span className={`${baseClasses} bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-2 border-emerald-200`}>
            {getStatusIcon(status)}
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 border-2 border-rose-200`}>
            {getStatusIcon(status)}
            Rejected
          </span>
        );
      case "bought":
        return (
          <span className={`${baseClasses} bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 border-2 border-violet-200`}>
            {getStatusIcon(status)}
            Sold
          </span>
        );
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-xl border border-blue-200">
          <div className="relative">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 bg-blue-200 rounded-full animate-ping opacity-20"></div>
          </div>
          <p className="text-xl font-bold text-gray-700">Loading amazing offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Colorful Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl text-white">
          <div className="flex items-center gap-4">
            {/* <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
              <Building className="w-8 h-8 text-white" />
            </div> */}
            <div>
              <h1 className="text-3xl font-black">Property Offers Dashboard</h1>
              <p className="text-blue-100 text-lg font-medium mt-2">Manage all your incoming property offers with style! 🏠✨</p>
            </div>
          </div>
        </div>

        {/* Colorful Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              label: "Total Offers", 
              value: offers.length, 
              gradient: "from-blue-500 to-cyan-500",
              icon: <TrendingUp className="w-6 h-6" />,
              bgGradient: "from-blue-50 to-cyan-50"
            },
            { 
              label: "Pending", 
              value: offers.filter(o => o.status === "pending").length, 
              gradient: "from-amber-500 to-yellow-500",
              icon: <Clock className="w-6 h-6" />,
              bgGradient: "from-amber-50 to-yellow-50"
            },
            { 
              label: "Accepted", 
              value: offers.filter(o => o.status === "accepted").length, 
              gradient: "from-emerald-500 to-green-500",
              icon: <CheckCircle className="w-6 h-6" />,
              bgGradient: "from-emerald-50 to-green-50"
            },
            { 
              label: "Sold", 
              value: offers.filter(o => o.status === "bought").length, 
              gradient: "from-violet-500 to-purple-500",
              icon: <ShoppingCart className="w-6 h-6" />,
              bgGradient: "from-violet-50 to-purple-50"
            }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl shadow-xl border-2 border-white hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-black text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Colorful Table */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gradient-to-r from-blue-200 to-purple-200 overflow-hidden">
          {offers.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                <Home className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">No offers yet! 🎯</h3>
              <p className="text-lg text-gray-600 font-medium">Amazing property offers will appear here when buyers make requests.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-2 text-left text-sm font-black uppercase tracking-wider">
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5" />
                        Property
                      </div>
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-black uppercase tracking-wider">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5" />
                        Location
                      </div>
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-black uppercase tracking-wider">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        Buyer Info
                      </div>
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-black uppercase tracking-wider">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5" />
                        Offer Price
                      </div>
                    </th>
                    <th className="px-6 py-2 text-left text-sm font-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-2 text-center text-sm font-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                  {offers.map((offer, index) => (
                    <tr key={offer._id} className={`hover:bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-50 to-purple-50' : 'from-pink-50 to-yellow-50'} transition-all duration-300  hover:shadow-lg`}>
                      <td className="px-2 py-4">
                        <div className="font-bold text-gray-900 text-lg">{offer.title}</div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-semibold">{offer.location}</span>
                        </div>
                      </td>

                      <td className="px-2 py-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                              <User className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="font-bold text-gray-900">{offer.buyerName}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                              <Mail className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{offer.buyerEmail}</span>
                          </div>

                        </div>
                      </td>


                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2 font-black text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          <DollarSign className="w-6 h-6 text-green-600" />
                          {offer.offerAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        {getStatusBadge(offer.status)}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center justify-center gap-3">
                          {offer.status === "pending" ? (
                            <>
                              <button
                                onClick={() => acceptOffer.mutate({ offerId: offer._id, propertyId: offer.propertyId })}
                                disabled={acceptOffer.isLoading}
                                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 text-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                              >
                                <Check className="w-4 h-4" />
                                Accept
                              </button>
                              <button
                                onClick={() => rejectOffer.mutate(offer._id)}
                                disabled={rejectOffer.isLoading}
                                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-indigo-500 hover:from-rose-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-rose-300"
                              >
                                <X className="w-4 h-4" />
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm font-bold bg-gray-100 px-4 py-2 rounded-full">No action needed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;