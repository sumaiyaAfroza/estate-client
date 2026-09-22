import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Users, Home, TrendingUp, Clock, CheckCircle, Star } from 'lucide-react';
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const AdminAnalytics = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  // Fetch all stats in parallel
  const { data: users = [] } = useQuery({
    queryKey: ["adminAllUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: properties = [] } = useQuery({
    queryKey: ["adminAllProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["adminAllReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["adminAllAppointments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointments");
      return res.data;
    },
  });

  // Aggregate stats
  const totalUsers = users?.length || 0;
  const totalAgents = users?.filter(u => u.role === 'agent').length || 0;
  const totalProperties = properties?.length || 0;
  const verifiedProps = properties?.filter(p => p.status === 'verified').length || 0;
  const pendingProps = properties?.filter(p => p.status === 'pending').length || 0;
  const soldProps = properties?.filter(p => p.status === 'sold').length || 0;
  const totalReviews = reviews?.length || 0;
  const avgRating = reviews?.reduce((sum, r) => sum + (r.rating || 0), 0) / (totalReviews || 1);
  const totalAppointments = appointments?.length || 0;
  const pendingAppointments = appointments?.filter(a => a.status === 'pending').length || 0;

  // Total revenue (sum of accepted offers that are completed)
  const totalRevenue = properties?.filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + (p.price?.min || 0), 0);

  // Bar chart: Properties by Status
  const statusBarData = {
    labels: ['Pending', 'Verified', 'Sold', 'Under Offer'],
    datasets: [{
      label: 'Properties',
      data: [
        pendingProps,
        verifiedProps,
        soldProps,
        properties?.filter(p => p.status === 'under-offer').length || 0,
      ],
      backgroundColor: ['#f59e0b', '#10b981', '#ef4444', '#6366f1'],
      borderRadius: 8,
    }],
  };

  // Pie chart: User Roles Distribution
  const rolePieData = {
    labels: ['Admin', 'Agent', 'User'],
    datasets: [{
      data: [
        users?.filter(u => u.role === 'admin').length || 0,
        totalAgents,
        users?.filter(u => u.role === 'user').length || 0,
      ],
      backgroundColor: ['#8b5cf6', '#10b981', '#3b82f6'],
      borderWidth: 2,
      borderColor: '#1e293b',
    }],
  };

  // Bar chart: Appointments by Status
  const appointmentBarData = {
    labels: ['Pending', 'Confirmed', 'Completed'],
    datasets: [{
      label: 'Appointments',
      data: [
        pendingAppointments,
        appointments?.filter(a => a.status === 'confirmed').length || 0,
        appointments?.filter(a => a.status === 'completed').length || 0,
      ],
      backgroundColor: ['#f59e0b', '#6366f1', '#10b981'],
      borderRadius: 8,
    }],
  };

  const statCards = [
    { title: "Total Users", value: totalUsers, icon: Users, color: "from-blue-500 to-cyan-400", sub: `${totalAgents} agents` },
    { title: "Properties", value: totalProperties, icon: Home, color: "from-emerald-500 to-teal-400", sub: `${verifiedProps} verified` },
    { title: "Revenue (Sold)", value: `৳${(totalRevenue / 100000).toFixed(1)}L`, icon: TrendingUp, color: "from-violet-500 to-purple-400", sub: `${soldProps} sold` },
    { title: "Avg Rating", value: avgRating.toFixed(1), icon: Star, color: "from-amber-500 to-yellow-400", sub: `${totalReviews} reviews` },
    { title: "Appointments", value: totalAppointments, icon: Clock, color: "from-pink-500 to-rose-400", sub: `${pendingAppointments} pending` },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <TrendingUp className="text-emerald-500" /> Analytics Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{card.title}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Properties by Status</h2>
          <Bar data={statusBarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">User Roles Distribution</h2>
          <Pie data={rolePieData} options={{ responsive: true }} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Appointment Status</h2>
          <Bar data={appointmentBarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Summary</h2>
          <div className="space-y-3 text-sm">
            {[
              [`Verified`, verifiedProps, 'emerald'],
              [`Pending Verification`, pendingProps, 'amber'],
              [`Sold`, soldProps, 'red'],
              [`Under Offer`, properties?.filter(p => p.status === 'under-offer').length || 0, 'indigo'],
              [`Total Reviews`, totalReviews, 'blue'],
              [`Avg Rating`, `${avgRating.toFixed(1)} / 5`, 'yellow'],
            ].map(([label, value, color], i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-bold text-${color}-600 dark:text-${color}-400`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
