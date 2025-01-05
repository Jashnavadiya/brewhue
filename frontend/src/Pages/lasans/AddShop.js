import React, { useState } from 'react';
import axios from 'axios';

const AddShop = () => {
  const [shopName, setShopName] = useState('');
  const [profile, setProfile] = useState('');
  const [bgPhoto, setBgPhoto] = useState('');
  const [bgcolor, setBgcolor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopName || !profile || !bgPhoto || !bgcolor) {
      setError('Please fill all fields.');
      return;
    }

    try {
      // Send the shop data to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`,
        { name: shopName, profile, bgPhoto, bgcolor }
      );
      alert('Shop added successfully!');
      // Reset the form
      setShopName('');
      setProfile('');
      setBgPhoto('');
      setBgcolor('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding shop');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Add New Shop</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Shop Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Profile Image URL</label>
            <input
              type="text"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Profile Image URL"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Background Photo URL</label>
            <input
              type="text"
              value={bgPhoto}
              onChange={(e) => setBgPhoto(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Background Photo URL"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Background Color</label>
            <input
              type="color"
              value={bgcolor}
              onChange={(e) => setBgcolor(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg w-full"
          >
            Add Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
