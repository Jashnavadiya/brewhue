import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
const ShopDetail = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState('');
  const [profile, setProfile] = useState('');
  const {shopName} =useParams()
  useEffect(() => {
    // Fetch shop details on mount
    const fetchShop = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`);
        setShop(response.data);
        setBgColor(response.data.bgcolor);
        setProfile(response.data.profile);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
        setLoading(false);
      }
    };
    fetchShop();
  }, [shopName]);

  const updateShop = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`, { bgcolor: bgColor, profile });
      setShop(response.data);
      alert('Shop updated successfully!');
    } catch (err) {
      alert(err.response ? err.response.data.error : 'Failed to update shop.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <img src={shop?.profile || 'placeholder.jpg'} alt="Shop Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h1 className="text-center text-2xl font-bold mb-4">{shop?.name}</h1>

        <label className="block mb-2 font-medium">Profile Image URL</label>
        <input
          type="text"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mt-4 mb-2 font-medium">Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={updateShop}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Update Shop
        </button>
      </div>
    </div>
  );
};

export default ShopDetail;
