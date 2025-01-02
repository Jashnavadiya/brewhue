
import React, { useEffect, useState } from 'react';
import { useParams ,useLocation} from "react-router-dom";
import axios from 'axios';

export default function ShopPage() {
  const {shopName} =useParams()
  const [shopData, setShopData] = useState(null);
  const [iconsData,setIconsData] = useState(null);
  useEffect(() => {
    if (shopName) {
      axios.get(`https://brewhue.onrender.com/api/${shopName}/shop`)
        .then((res) => setShopData(res.data))
        .catch((err) => console.error('Error fetching shop data', err));
        axios.get(`https://brewhue.onrender.com/api/${shopName}/widgets`)
        .then((res) => setIconsData(res.data))
        .catch((err) => console.error('Error fetching shop data', err));
        
    }
    console.log(iconsData);
  }, [shopName]);



  if (!shopData) return <div>Loading...</div>;

  // const iconsData = [
  //   { id: 1, name: 'Menu', link: '#', icon: '📄' },
  //   { id: 2, name: 'Google Maps', link: '#', icon: '📍' },
  //   { id: 3, name: 'Instagram', link: '#', icon: '📸' },
  //   { id: 4, name: 'Contact Card', link: '#', icon: '👤' },
  //   { id: 5, name: 'WhatsApp', link: '#', icon: '💬' },
  //   { id: 6, name: 'Mail', link: '#', icon: '✉️' },
  // ];

  return (
    <div className="min-h-screen  p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{shopData.name}</h1>
      <img src={shopData.profile} alt={shopData.name} className="w-24 h-24 rounded-full" />
      <p className="mt-4 mb-6">{shopData.description}</p>
     
      <div className="text-center font-sans">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded mb-6 hover:bg-yellow-600">
          Tap to Connect
        </button>
        <hr className="my-6 border-gray-300" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
          {iconsData.map((icon) => (
            <a
              href={icon.link}
              key={icon.name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-black no-underline hover:text-yellow-500"
            >
              <div className="flex flex-col items-center">
              <img src={icon.logo} alt={icon.name} className="w-24 h-24 rounded-full" />
                <span className="text-sm font-medium">{icon.name}</span>
              </div>
            </a>
          ))}
        </div>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded mt-6 hover:bg-yellow-600">
          Create Your Profile
        </button>
      </div>
    </div>
  );
}
