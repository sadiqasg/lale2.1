const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  collectionName: String,
  price: Number,
  qty: Number,
  date: { type: String, default: new Date() }
});

module.exports = mongoose.model('Product', ProductSchema);
