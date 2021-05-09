const express = require('express');
const router  = express.Router(); 
const adminController = require('../controllers/admin');
const verifyToken = require('../middlewares/verifyToken');
const jwt_decode = require("jwt-decode");

router.get('/login', function (req, res, next) {
  let token = req.cookies['token'] ? req.cookies['token'].split(' ') : '';

  if (token) {
    let { user } = jwt_decode(token[1]);
  
    if (user && user.email && user.password) {
      return res.redirect("/admin");
    }
  }

  res.render('login', { page: 'Admin Login' });
});

router.get('/create', function (req, res, next) {
  res.render('login-create', { page: 'Admin' });
});

router.post('/', adminController.uploadImg, adminController.postProduct);

router.get('/',  verifyToken, adminController.getAllProducts);
router.get('/:id', verifyToken, adminController.getSingleProduct);

router.get('/delete/:id', adminController.deleteProduct);
// router.get('/delete/all', adminController.absoluteCancel);


module.exports = router;
