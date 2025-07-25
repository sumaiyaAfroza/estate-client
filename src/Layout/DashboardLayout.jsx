import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaUserCheck, FaUserClock, FaBars, FaHeart, FaUserShield, FaClipboardList } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  // Default home link
  const homeLink = (
    <div className='flex justify-center'>
      <NavLink className='flex justify-center bg-sky-400 px-10 rounded-2xl my-4 items-center gap-4' to='/'>
        <FaHome />
        <span className='font-bold text-2xl p-4'>Home</span>
      </NavLink>
    </div>
  );

  // Menu based on role
  const getMenuItems = () => {
    if (roleLoading) return [];

    if (role === 'agent') {
      return [
        { path: '/dashboard/agentProfile', label: 'Agent Profile', icon: <FaUserEdit /> },
        { path: '/dashboard/addProperty', label: 'Add Property', icon: <FaBoxOpen /> },
        { path: '/dashboard/myAddedProperties', label: 'My Added Properties', icon: <FaClipboardList /> },
        { path: '/dashboard/mySoldProperty', label: 'My Sold Properties', icon: <FaMoneyCheckAlt /> },
        { path: '/dashboard/requestedProperty', label: 'Requested Properties', icon: <FaSearchLocation /> },
      ];
    }

    if (role === 'user') {
      return [
        { path: '/dashboard/myProfile', label: 'My Profile', icon: <FaUserEdit /> },
        { path: '/dashboard/wishLists', label: 'Wish List', icon: <FaHeart /> },
        { path: '/dashboard/propertyBought', label: 'Property Bought', icon: <FaMoneyCheckAlt /> },
        { path: '/dashboard/myReviews', label: 'My Reviews', icon: <FaBoxOpen /> },
      ];
    }

    if (role === 'admin') {
      return [
        { path: '/dashboard/adminProfile', label: 'Admin Profile', icon: <FaUserShield /> },
        { path: '/dashboard/manageProperties', label: 'Manage Properties', icon: <FaBoxOpen /> },
        { path: '/dashboard/manageUsers', label: 'Manage Users', icon: <FaUserCheck /> },
        { path: '/dashboard/manageReviews', label: 'Manage Reviews', icon: <FaBoxOpen /> },
        { path: '/dashboard/advertise-property', label: 'Advertise Property', icon: <FaBoxOpen /> },
      ];
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg fixed inset-y-0 left-0 z-30">
        {homeLink}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-300'
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span className="font-semibold">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar Drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto">
          {homeLink}
          <nav className="space-y-2">
            {menuItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-300'
                  }`
                }
              >
                <span className="text-lg">{icon}</span>
                <span className="font-semibold">{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen lg:pl-64">
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3 shadow-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 rounded-md"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <div />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
