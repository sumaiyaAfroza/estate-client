import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaHome, FaMoneyBillWave, FaChartBar } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

const DashboardOverview = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [email, setEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [userStats, setUserStats] = useState(null);

  // Fetch total users count (admin only)
  const { data: allUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: false, // Only load on demand
  });

  // Fetch all properties for stats
  const { data: allProperties = [], isLoading: loadingProps } = useQuery({
    queryKey: ["allPropertiesForDashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/properties");
      return res.data;
    },
  });

  // Fetch my offers (for agents/users)
  const { data: myOffers = [], isLoading: loadingOffers } = useQuery({
    queryKey: ["myOffersDashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user?.email}&role=user`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch my properties (for agents)
  const { data: myProperties = [], isLoading: loadingMyProps } = useQuery({
    queryKey: ["myPropertiesDashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAddedProperty?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Load user stats on first render if admin
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get("/users").then(res => {
        if (Array.isArray(res.data)) {
          setUserStats({
            totalUsers: res.data.length,
            adminCount: res.data.filter(u => u.role === 'admin').length,
            agentCount: res.data.filter(u => u.role === 'agent').length,
            userCount: res.data.filter(u => u.role === 'user').length,
          });
        }
      }).catch(() => {});
    }
  }, [user?.email, axiosSecure]);

  // Stats calculations
  const totalUsers = userStats?.totalUsers || 0;
  const totalProperties = allProperties?.length || 0;
  const soldCount = allProperties?.filter(p => p.status === 'sold').length || 0;
  const pendingCount = allProperties?.filter(p => p.status === 'pending').length || 0;
  const verifiedCount = allProperties?.filter(p => p.status === 'verified').length || 0;
  const rejectedCount = allProperties?.filter(p => p.status === 'rejected').length || 0;

  const totalRevenue = allProperties
    ?.filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + (p.price?.max || 0), 0) || 0;

  // My stats
  const myOfferCount = myOffers?.length || 0;
  const myPendingOffers = myOffers?.filter(o => o.status === 'pending').length || 0;
  const myAcceptedOffers = myOffers?.filter(o => o.status === 'accepted').length || 0;
  const mySoldOffers = myOffers?.filter(o => o.status === 'bought').length || 0;
  const myPropertiesCount = myProperties?.length || 0;

  // Bar chart data (property status distribution)
  const barData = {
    labels: ['Pending', 'Verified', 'Sold', 'Rejected'],
    datasets: [{
      label: 'Properties',
      backgroundColor: ['#fbbf24', '#38bdf8', '#34d399', '#f87171'],
      data: [pendingCount, verifiedCount, soldCount, rejectedCount],
    }],
  };

  // Pie chart data
  const pieData = {
    labels: ['Available', 'Sold', 'Pending'],
    datasets: [{
      data: [verifiedCount, soldCount, pendingCount],
      backgroundColor: ['#38bdf8', '#34d399', '#fbbf24'],
    }],
  };

  // Password reset handler
  const handlePasswordReset = async () => {
    if (!email) {
      setResetError('Please enter your email address');
      return;
    }
    setResetLoading(true);
    setResetError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordResetSent(true);
    } catch (err) {
      let message = 'Failed to send reset email.';
      if (err.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again later.';
      }
      setResetError(message);
    } finally {
      setResetLoading(false);
    }
  };

  const isAdmin = user?.role === 'admin' || userStats?.totalUsers > 0;

  return (
    <div className="p-6">
      {/* Password Reset Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🔐 Forgot Password?</h3>
        <p className="text-sm text-gray-600 mb-4">Enter your email to receive a password reset link via Firebase.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered flex-1"
          />
          <button
            onClick={handlePasswordReset}
            disabled={resetLoading}
            className="btn btn-primary"
          >
            {resetLoading ? <span className="loading loading-spinner loading-xs"></span> : null}
            Send Reset Link
          </button>
        </div>
        {passwordResetSent && (
          <p className="text-green-600 text-sm mt-2">✅ Password reset email sent! Check your inbox.</p>
        )}
        {resetError && (
          <p className="text-red-600 text-sm mt-2">{resetError}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Note: To enable password reset, make sure "Email/Password" sign-in method is enabled in your Firebase Console.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Users</p>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <FaUsers className="text-3xl opacity-60" />
          </div>
        </div>

        {/* Total Properties */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Properties</p>
              <p className="text-3xl font-bold">{totalProperties}</p>
            </div>
            <FaHome className="text-3xl opacity-60" />
          </div>
        </div>

        {/* Sales Count */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Sold</p>
              <p className="text-3xl font-bold">{soldCount}</p>
            </div>
            <FaMoneyBillWave className="text-3xl opacity-60" />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Revenue</p>
              <p className="text-2xl font-bold">৳{totalRevenue.toLocaleString()}</p>
            </div>
            <FaChartBar className="text-3xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Status Overview</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Distribution</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>

      {/* User's Personal Stats (if logged in) */}
      {user?.email && (
        <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 Your Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{myPropertiesCount}</p>
              <p className="text-sm text-gray-600">My Properties</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{myPendingOffers}</p>
              <p className="text-sm text-gray-600">Pending Offers</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{myAcceptedOffers}</p>
              <p className="text-sm text-gray-600">Accepted</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{mySoldOffers}</p>
              <p className="text-sm text-gray-600">Sold</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
