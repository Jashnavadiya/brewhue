// components/Dashboard/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ shopName }) => {
  return (
    <div className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <NavLink
          to={`/${shopName}/dashboard`}
          className="text-2xl font-bold text-gray-800 hover:text-blue-600"
        >
          Admin Panel
        </NavLink>
        <div className="flex items-center space-x-6">
          {/* Add more items in the navbar */}
          <NavLink
            to={`/${shopName}/dashboard/widgets`}
            className="text-lg text-gray-600 hover:text-blue-600"
          >
            Widgets
          </NavLink>
          <NavLink
            to={`/${shopName}/dashboard/orders`}
            className="text-lg text-gray-600 hover:text-blue-600"
          >
            Orders
          </NavLink>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
