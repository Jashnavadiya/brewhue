// import React, { useState } from 'react';
// import axios from 'axios';

// const AddShop = () => {
//   const [shopName, setShopName] = useState('');
//   const [profile, setProfile] = useState('');
//   const [bgPhoto, setBgPhoto] = useState('');
//   const [bgcolor, setBgcolor] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!shopName || !profile || !bgPhoto || !bgcolor) {
//       setError('Please fill all fields.');
//       return;
//     }

//     try {
//       // Send the shop data to the backend
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`,
//         { name: shopName, profile, bgPhoto, bgcolor }
//       );
//       alert('Shop added successfully!');
//       // Reset the form
//       setShopName('');
//       setProfile('');
//       setBgPhoto('');
//       setBgcolor('');
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error adding shop');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-8">Add New Shop</h1>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-lg font-medium">Shop Name</label>
//             <input
//               type="text"
//               value={shopName}
//               onChange={(e) => setShopName(e.target.value)}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Shop Name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium">Profile Image URL</label>
//             <input
//               type="text"
//               value={profile}
//               onChange={(e) => setProfile(e.target.value)}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Profile Image URL"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium">Background Photo URL</label>
//             <input
//               type="text"
//               value={bgPhoto}
//               onChange={(e) => setBgPhoto(e.target.value)}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Background Photo URL"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium">Background Color</label>
//             <input
//               type="color"
//               value={bgcolor}
//               onChange={(e) => setBgcolor(e.target.value)}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//           <button
//             type="submit"
//             className="p-2 bg-blue-500 text-white rounded-lg w-full"
//           >
//             Add Shop
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddShop;
// Import necessary libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateShop = () => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/create-database/${shopName}`, {
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };
  useEffect(()=>{
    console.log(message);
    
  },[message])

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
