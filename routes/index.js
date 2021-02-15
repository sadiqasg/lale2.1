var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page:'Home' });
});

router.get('/admin', function (req, res, next) {
  res.render('admin', { page: 'Home' });
});

module.exports = router;
