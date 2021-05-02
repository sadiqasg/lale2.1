const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  number: Number,
  product: String,
  price: String,
  qty: Number,
  date: { type: String, default: new Date() }
});

module.exports = mongoose.model('Customer', CustomerSchema);
