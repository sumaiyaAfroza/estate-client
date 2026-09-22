import { useQuery } from "@tanstack/react-query";
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Home, Eye, Clock, TrendingUp, Heart, CheckCircle } from 'lucide-react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AgentPerformance = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data: properties = [] } = useQuery({
    queryKey: ["agentProps", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAddedProperty?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const { data: offers = [] } = useQuery({
    queryKey: ["agentOffers", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Stats
  const totalViews = properties?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;
  const totalProps = properties?.length || 0;
  const pendingOffers = offers?.filter(o => o.status === 'pending').length || 0;
  const acceptedOffers = offers?.filter(o => o.status === 'accepted').length || 0;
  const rejectedOffers = offers?.filter(o => o.status === 'rejected').length || 0;
  const conversionRate = offers.length > 0
    ? ((acceptedOffers / offers.length) * 100).toFixed(1)
    : '0.0';

  // Chart data: views over last 7 properties (by index)
  const recentProps = properties?.slice(-7) || [];
  const viewsChartData = {
    labels: recentProps.map((_, i) => `Prop ${i + 1}`),
    datasets: [{
      label: 'Views',
      data: recentProps.map(p => p.views || 0),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  // Chart data: offer status breakdown
  const offerPieData = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [{
      data: [pendingOffers, acceptedOffers, rejectedOffers],
      backgroundColor: ['#f59e0b', '#10b981', '#ef4444'],
      borderWidth: 2,
      borderColor: '#1e293b',
    }],
  };

  const statCards = [
    { title: "Total Properties", value: totalProps, icon: Home, color: "from-blue-500 to-cyan-400" },
    { title: "Total Views", value: totalViews, icon: Eye, color: "from-emerald-500 to-teal-400" },
    { title: "Pending Offers", value: pendingOffers, icon: Clock, color: "from-amber-500 to-yellow-400" },
    { title: "Accepted Offers", value: acceptedOffers, icon: CheckCircle, color: "from-violet-500 to-purple-400" },
    { title: "Conversion Rate", value: `${conversionRate}%`, icon: TrendingUp, color: "from-pink-500 to-rose-400" },
    { title: "Wishlisted", value: 0, icon: Heart, color: "from-red-500 to-orange-400", sub: "by all users" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <TrendingUp className="text-emerald-500" /> Agent Performance
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon size={18} className="text-white" />
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{card.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{card.title}</p>
            {card.sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Views Trend</h2>
          <Line data={viewsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Offer Status Breakdown</h2>
          <Bar data={offerPieData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* Property List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">My Properties</h2>
        {properties?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No properties added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 text-left">
                  <th className="pb-2 text-gray-500 dark:text-gray-400">Title</th>
                  <th className="pb-2 text-gray-500 dark:text-gray-400">Status</th>
                  <th className="pb-2 text-gray-500 dark:text-gray-400">Views</th>
                  <th className="pb-2 text-gray-500 dark:text-gray-400">Price</th>
                </tr>
              </thead>
              <tbody>
                {properties?.map((p) => (
                  <tr key={p._id} className="border-b dark:border-gray-700">
                    <td className="py-2 font-medium text-gray-800 dark:text-white">{p.title}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                        p.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{p.views || 0}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">
                      ৳{(p.price?.min || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPerformance;
