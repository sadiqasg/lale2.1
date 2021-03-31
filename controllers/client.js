const Product = require('../models/product');

let products;

const getKitchenProducts = (req, res, next) => {
  Product.find({ collectionName: 'kitchen' }, (err, data) => {
    if (err) {
      return res.send({ "Failed": err });
    }
    res.render('client/kitchen', { page: 'Kitchen', products: data })
  })
};

const getSofaProducts = (req, res, next) => {
  Product.find({ collectionName: 'sofa' }, (err, data) => {
    if (err) {
      return res.send({ "Failed": err });
    }
    res.render('client/homedeco', { page: 'Sofa', products: data })
  })
};

module.exports = {
  getKitchenProducts,
  getSofaProducts
}