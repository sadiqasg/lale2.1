const multer = require('multer');
const Product = require('../models/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadImg = multer({ storage: storage }).any('image');

const getAllProducts = (req, res, next) => {
  Product.find({}, (err, data) => {
    if (err) {
      return res.send({ "Failed": err });
    }
    return res.render('admin', { page: 'Home', products: data });
  })
};

const postProduct = (req, res, next) => {
  //check if the Product name already exists in db
  Product.findOne({ name: req.body.name }, (data) => {

    //if Product not in db, add it
    if (data === null) {

      let price = req.body.price;
      let formatPrice = (new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })).format(price)

      let filesArray = req.files;
      let files = "";

      if (filesArray.length > 1) {
        for (var file in filesArray) {
          files += filesArray[file].path + ","
        }
      } else {
        files += req.files.path // i removed [0] in files[0]
      }

      //create a new Product object using the Product model and req.body
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description ? req.body.description : 'N/A',
        image: files,
        collectionName: req.body.collection,
        price: formatPrice,
        qty: req.body.qty ? req.body.qty : 0,
      });

      // save this object to database
      newProduct.save((err, data) => {
        if (err) return res.json({ Error: err });
        return res.redirect("/admin");
      })
      //if Product is in db, return a message to inform it exists            
    } else {
      return res.json({ message: "Product already exists" });
    }
  })
}

const getSingleProduct = (req, res, next) => {
  let id = req.params.id;

  Product.findOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Product not found" });
    }
    else {
      let img = data.image;
      let images = img.split(",");
      if (images.length > 1) {
        return res.render('product-detail', { page: 'Details', product: data, images: images });
      }
      return res.render('product-detail', { page: 'Details', product: data, images: null });

    }
  });
};

const deleteProduct = (req, res, next) => {
  let id = req.params.id; // get the name of tea to delete

  Product.deleteOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Product not found" });
    }
    else return res.redirect("/admin");
  });
}

const absoluteCancel = (req, res, next) => {
  Product.deleteMany({}, err => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.redirect('/admin');
  })
}

module.exports = { getAllProducts, getSingleProduct, postProduct, deleteProduct, uploadImg, absoluteCancel };