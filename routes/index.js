var express = require('express');
var router = express.Router();
const clientController = require("../controllers/client");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home' });
});

router.get('/kitchen', clientController.getKitchenProducts);

  // res.render('client/kitchen', { page: 'Kitchen Collection' })

router.get('/chairs_sofa', function (req, res, next) {
  res.render('client/chairs-sofa', { page: 'Chairs and Sofa' })
});

router.get('/pd', function (req, res, next) {
  res.render('client/details', { page: 'Product Details' });
});

router.get('/cart', function (req, res, next) {
  res.render('client/cart', { page: 'Cart' });
});

module.exports = router;
