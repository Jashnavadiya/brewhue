import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/users/Signup';
import Login from './Pages/users/Login';
import ShopPage from './Pages/shop/Shopdetails';
import Dashboard from './components/Dashboard';
import ShopForm from './components/ShopForm';
import ShopDataFetcher from './Pages/lasans/ShopDataFetcher';
import AddShop from './Pages/lasans/AddShop';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/:shopName/dashboard" element={<Dashboard/>} />
      <Route path="/create-shop" element={<ShopForm />} />
      <Route path="/lasan" element={<ShopDataFetcher />} />
      <Route path="/add-shop" element={<AddShop />} />
      
      <Route path="/:shopName" element={<ShopPage/>}>
      </Route>
    </Routes>
  );
}

export default App;
