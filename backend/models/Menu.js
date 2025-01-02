const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  itemName: String,
  price: Number
});

module.exports = mongoose.model('Menu', menuSchema);
