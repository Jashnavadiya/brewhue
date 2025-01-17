import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useHref } from "react-router-dom";
import Signup from './Pages/users/Signup';
import Login from './Pages/users/Login';
import ShopPage from './Pages/shop/Shopdetails';
import ShopForm from './components/ShopForm';
import ShopDataFetcher from './Pages/lasans/ShopDataFetcher';
import AddShop from './Pages/lasans/AddShop';
import ShopProfile from './admin/ShopProfile';
import Dashboard from './admin/Dashboard';
import ShopDetail from './admin/ShopInfo';
import LoadingZoomText from './Pages/lasans/Test';
import Settings from './admin/Settings';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';




import { Menu, NextUIProvider } from '@nextui-org/react';
import UserPanel from './admin/Userpanel';
import Notfound404 from './components/Notfound404';
function App() {
  const customTheme = {
    theme: {
      colors: {
        primary: '#ff6347', // Custom primary color
        secondary: '#385007', // Custom secondary color
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#385007',
      },
    },
  };
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
      

        <Route path="/:shopName" element={<ShopPage />}>
          {/* Nested Routes */}
          {/* <Route path="widgets" element={<Widgets />} /> */}
          <Route path="*" element={<Notfound404 />} />

        </Route>
       

        <Route path="/create-shop" element={<ShopForm />} />
        <Route path="/lasan" element={<ShopDataFetcher />} />
        <Route path="/add-shop" element={<AddShop />} />
        <Route path="/test" element={<LoadingZoomText />} />

        <Route path="/:shopName" element={<ShopPage />}/>
        <Route path="/:shopName/signup" element={<Signup />} />
        <Route path="/:shopName/login" element={<Login />} />
        <Route path="/:shopName/dashboard" element={<Dashboard />}>
          {/* Nested Routes */}
          {/* <Route path="widgets" element={<Widgets />} /> */}
          <Route path="profile" element={<ShopProfile />} />
          <Route path="info" element={<ShopDetail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="userpanel" element={<UserPanel />} />
          <Route path="*" element={<Notfound404 />} />
        </Route>

    
        <Route path="/notfound" element={<Notfound404 />} />
        <Route path="/" element={<Notfound404 />} />
      </Routes>
    </NextUIProvider>

  );
}

export default App;
