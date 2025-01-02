const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profile: { type: String, required: true },
  bgPhoto: { type: String, required: true},
  bgcolor: { type: String, required: true}
}, { timestamps: true });


module.exports = mongoose.model('Shop', shopSchema);
