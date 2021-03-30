const express = require('express');
const router  = express.Router(); 
const adminController = require('../controllers/admin');

router.get('/login', function (req, res, next) {
  res.render('login', { page: 'Admin Login' });
});

router.post('/', adminController.uploadImg, adminController.postProduct);

router.get('/', adminController.getAllProducts);
router.get('/:id', adminController.getSingleProduct);

router.get('/delete/:id', adminController.deleteProduct);
// router.get('/delete/all', adminController.absoluteCancel);


module.exports = router;
