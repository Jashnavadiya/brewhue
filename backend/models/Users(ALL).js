// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  shopname: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = (connection) => connection.model('UserAll', userSchema);
const UserallPanel = mongoose.model('UserAll', userSchema);

module.exports = UserallPanel;

