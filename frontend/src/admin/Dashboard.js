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

      <div className='flex '>
        <div className='w-2/12 border-e-[#F3F2F2] border sticky top-0 '>
          <div className="h-screen flex-col justify-between sticky top-0 bg-white hidden lg:flex ">

            <div className="px-4 py-6">
              <div className='w-1/2 flex justify-center align-middle'>
                <img src="/enso.png" alt=""  className='w-full '/>
              </div>
              <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
                <Link
                  to={`/${shopName}/dashboard/home`}
                  className="flex items-center align-middle gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
                >
                  <img
                    alt="dashboard-icon"
                    src="/icons/home.png"
                    className='w-4'
                  />
                  <span className="text-base font-normal">Home</span>
                </Link>
                <Link
                  to={`/${shopName}/dashboard/settings`}
                  className="flex items-center align-middle gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
                >
                  <img
                    alt="dashboard-icon"
                    src="/icons/setting.png"
                    className='w-4'
                  />
                  <span className="text-base font-normal">Settings</span>
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
          <Navbar shopName={shopName} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
