import React from 'react';
import { FaUsers, FaHome, FaMoneyBillWave, FaChartBar } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardOverview = () => {
  // Dummy data for demonstration
  const stats = {
    users: 1200,
    properties: 350,
    sales: 150,
    revenue: 1200000,
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Properties Sold',
        backgroundColor: '#38bdf8',
        data: [12, 19, 8, 15, 22, 17],
      },
    ],
  };

  const pieData = {
    labels: ['Available', 'Sold', 'Rented'],
    datasets: [
      {
        data: [200, 100, 50],
        backgroundColor: ['#38bdf8', '#fbbf24', '#f87171'],
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-sky-600">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <FaUsers className="text-3xl text-sky-400 mb-2" />
          <span className="text-lg font-semibold">{stats.users}</span>
          <span className="text-gray-500">Total Users</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <FaHome className="text-3xl text-sky-400 mb-2" />
          <span className="text-lg font-semibold">{stats.properties}</span>
          <span className="text-gray-500">Properties</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <FaMoneyBillWave className="text-3xl text-sky-400 mb-2" />
          <span className="text-lg font-semibold">{stats.sales}</span>
          <span className="text-gray-500">Sales</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <FaChartBar className="text-3xl text-sky-400 mb-2" />
          <span className="text-lg font-semibold">${stats.revenue.toLocaleString()}</span>
          <span className="text-gray-500">Revenue</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Properties Sold (Last 6 Months)</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Property Status</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
