import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/users/Signup';
import Login from './Pages/users/Login';
import ShopPage from './Pages/shop/Shopdetails';
import ShopForm from './components/ShopForm';
import ShopDataFetcher from './Pages/lasans/ShopDataFetcher';
import AddShop from './Pages/lasans/AddShop';
import ShopProfile from './admin/ShopProfile';
import Dashboard from './admin/Dashboard';
import ShopDetail from './admin/ShopInfo';

function App() {
  return (
    <Routes>
      <Route path="/:shopName/signup" element={<Signup />} />
      <Route path="/:shopName/login" element={<Login />} />
      <Route path="/:shopName/dashboard" element={<Dashboard />}>
          {/* Nested Routes */}
          {/* <Route path="widgets" element={<Widgets />} /> */}
          <Route path="profile" element={<ShopProfile />} />
          <Route path="info" element={<ShopDetail />} />
        </Route>
      <Route path="/create-shop" element={<ShopForm />} />
      <Route path="/lasan" element={<ShopDataFetcher />} />
      <Route path="/add-shop" element={<AddShop />} />
      
      <Route path="/:shopName" element={<ShopPage/>}>
      </Route>
    </Routes>
  );
}

export default App;
