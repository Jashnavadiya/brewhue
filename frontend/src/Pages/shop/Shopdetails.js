import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { Outlet, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../../components/Loadingscreen';
import './ShopDetails.css';
import AddShop from '../lasans/AddShop';
import ShopHome from './ShopHome';
import PdfViewer from '../../components/PdfViewer';
import ShopMenu from './ShopMenu';
import ShopLayout from './ShopLayout';


const ShopPage = () => {
  const [selected, setSelected] = React.useState("photos");
  const { shopName } = useParams();
  const [shopData, setShopData] = useState(null);
  const [iconsData, setIconsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false); // State to track if "Menu" tab is selected

  useEffect(() => {
    if (shopName) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`)
        .then((res) => setShopData(res.data))
        .catch((err) => console.error('Error fetching shop data', err));

      axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/widgets`)
        .then((res) => setIconsData(res.data))
        .catch((err) => console.error('Error fetching widgets data', err));
    }
  }, [shopName]);
  const MainContent = () => {
    return (
        <ShopLayout/>
    );
  };

  return <LoadingScreen Loading={loading} OgComponent={MainContent} />;
};

export default ShopPage;
