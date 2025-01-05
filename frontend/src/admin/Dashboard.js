// components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Dashboard = () => {
  const { shopName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("hi", token);

    if (!token) {
      navigate(`/${shopName}/login`);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/users/me`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => {
        setError('Failed to fetch user data');
        navigate(`/${shopName}/login`);
      });
  }, [shopName, navigate]);

  // If there is an error, display it
  if (error) return <p>{error}</p>;
  const localStorageData = JSON.parse(localStorage.getItem("user")) || [];
  return (
    <div className="flex-col h-screen">
      {/* Sidebar */}
      <Navbar shopName={shopName} />
      <div className='flex h-full'>
        <div className='w-2/12'>
          <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
            <div className="px-4 py-6">
              <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
                <Link
                  to={`/${shopName}/dashboard/profile`}
                  className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
                >
                  <img
                    alt="dashboard-icon"
                    src="/dashboard-icon.png"
                  />
                  <span className="text-sm font-medium"> Dashboard </span>
                </Link>
                <Link
                  to={`/${shopName}/dashboard/info`}
                  className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
                >
                  <img
                    alt="dashboard-icon"
                    src="/dashboard-icon.png"
                  />
                  <span className="text-sm font-medium"> info </span>
                </Link>


              </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                <img
                  alt="Profile"
                  src={localStorageData.imageUrl}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      {localStorageData.firstName + " " + localStorageData.lastName}
                    </strong>

                    <span> {localStorageData.email} </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-10/12 h-full">
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
