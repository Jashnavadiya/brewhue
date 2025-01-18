import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../components/Loadingscreen';
import './ShopDetails.css';
import ShopLayout from './ShopLayout';


const ShopPage = () => {
  const { shopName } = useParams();
  console.log(shopName);
  const [loading, setLoading] = useState(false);
  const nav=useNavigate();
  const checkDatabase = async () => {
    if (!shopName) return;
  
    setLoading(true);

  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-database/${shopName}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        console.log('Database does not exist.');
        nav("/notfound")
    }}
  };
  
  useEffect(() => {
    checkDatabase();
  }, [shopName]);
  


  const [shopData, setShopData] = useState(null);
  const [iconsData, setIconsData] = useState(null);
  const [isMenu, setIsMenu] = useState(false); // State to track if "Menu" tab is selected


  


  const MainContent = () => {
    return (
        <ShopLayout/>
    );
  };

  return <LoadingScreen Loading={loading} OgComponent={MainContent} />;
};

export default ShopPage;
