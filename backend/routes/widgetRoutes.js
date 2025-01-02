const express = require('express');
const Widget = require('../models/Widget');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, logo, link } = req.body;
  const widget = new Widget({ name, logo, link });
  await widget.save();
  res.json(widget);
});

module.exports = router;
