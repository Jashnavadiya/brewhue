const express = require('express');
const Shop = require('../models/Shop');
const Menu = require('../models/Menu'); // Make sure Menu model is required
const Widget = require('../models/Widget'); // Make sure Widget model is required
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, profile, menu, widgets } = req.body;
  const shop = new Shop({ name, profile, menu, widgets });
  await shop.save();
  res.json(shop);
});


router.get('/', async (req, res) => {
  try {
    console.log('Fetching shops...');
    const shops = await Shop.find()
      .populate('menu')    // Populate menu field
      .populate('widgets'); // Populate widgets field
    
    // Debugging logs to check the populated data
    console.log('Shops fetched with populated data:', shops);
    
    res.json(shops);
  } catch (err) {
    console.error('Error during population:', err);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

module.exports = router;
