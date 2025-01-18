import React, { useState } from 'react';
import axios from 'axios';

const CreateShop = () => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // To hold the uploaded image
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Check if image is selected
    if (!profileImage) {
      setError('Please upload a profile image.');
      return;
    }

    // Prepare form data to send the image and other data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', profileImage); // Append the profile image
    formData.append('shopName', shopName);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/create-database/${shopName}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Shop</h2>

        {message && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">{message}</div>
        )}

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="shopName" className="block text-gray-700 font-medium mb-2">
              Shop Name
            </label>
            <input
              id="shopName"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter shop name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="profileImage" className="block text-gray-700 font-medium mb-2">
              Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])} // Save the selected file
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
