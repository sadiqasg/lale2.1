var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page:'Home' });
});

router.get('/pd', function(req, res, next) {
  res.render('product-detail', { page:'PD' });
});

module.exports = router;
