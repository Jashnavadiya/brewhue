import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../components/Loadingscreen';
import './ShopDetails.css';
import ShopLayout from './ShopLayout';


const ShopPage = () => {
  const { shopName } = useParams();
  const [shopData, setShopData] = useState(null);
  const [iconsData, setIconsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false); // State to track if "Menu" tab is selected

  // useEffect(() => {
  //   if (shopName) {
  //     axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`)
  //       .then((res) => setShopData(res.data))
  //       .catch((err) => console.error('Error fetching shop data', err));

  //     axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/widgets`)
  //       .then((res) => setIconsData(res.data))
  //       .catch((err) => console.error('Error fetching widgets data', err));
  //   }
  // }, [shopName]);
  const MainContent = () => {
    return (
        <ShopLayout/>
    );
  };

  return <LoadingScreen Loading={loading} OgComponent={MainContent} />;
};

export default ShopPage;
