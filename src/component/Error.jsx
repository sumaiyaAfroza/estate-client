import React from 'react';
import { Link } from 'react-router-dom';


const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl px-10 py-14 max-w-lg w-full text-center border border-gray-100 dark:border-gray-800">
        <div className="mb-6">
          <span className="text-7xl font-extrabold text-blue-600">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          Sorry, the page you are looking for does not exist, was removed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-base">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;