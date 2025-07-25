import { Outdent } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div>
    
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600 dark:text-white">Use the sidebar to navigate through the options.</p>
     
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
