const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

router.post('/', async (req, res) => {
  const { itemName, price } = req.body;
  const menu = new Menu({ itemName, price });
  await menu.save();
  res.json(menu);
});

module.exports = router;
