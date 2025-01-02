import React, { useState } from 'react';
import axios from 'axios';

const ShopForm = () => {
  const [shop, setShop] = useState({ name: '', profile: '', menu: [], widgets: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://brewhue.onrender.com/api/shops', shop);
      setShop({ name: '', profile: '', menu: [], widgets: [] });
      alert('Shop created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating shop');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Shop Name"
        value={shop.name}
        onChange={(e) => setShop({ ...shop, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Profile Image URL"
        value={shop.profile}
        onChange={(e) => setShop({ ...shop, profile: e.target.value })}
      />
      {/* Add logic for Menu and Widgets */}
      <button type="submit">Create Shop</button>
    </form>
  );
};

export default ShopForm;
