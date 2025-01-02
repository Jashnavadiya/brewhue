const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = {
  modelName: 'Widget',
  schema: widgetSchema
};
