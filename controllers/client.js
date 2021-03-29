const Product = require('../models/product');

let products;

const getKitchenProducts = (req, res, next) => {
  Product.find({ name: 'doc' }, (err, data) => {
    if (err) {
      return res.send({ "Failed": err });
    }
    // console.log(data)
    res.render('client/kitchen', { page: 'Kitchen', products: data })
  })
};

module.exports = {
  getKitchenProducts
}