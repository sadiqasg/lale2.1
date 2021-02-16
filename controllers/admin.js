const Product = require('../models/product');

let products;

const getAllProducts = (req, res, next) => {
  Product.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    products = data;
    return res.render('admin', { page: 'Home', products: products });
  })
};

const postProduct = (req, res, next) => {
  //check if the Product name already exists in db
  Product.findOne({ name: req.body.name }, (data) => {

    //if Product not in db, add it
    if (data === null) {
      //create a new Product object using the Product model and req.body
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        collectionName: req.body.collection,
        price: req.body.price,
        qty: req.body.qty,
      });

      // save this object to database
      newProduct.save((err, data) => {
        if (err) return res.json({ Error: err });
        products.push(data);
        return res.render('admin', { page: 'Home', products: products });
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
    else return res.json(data);
  });
};

const deleteProduct = (req, res, next) => {
  let id = req.params.id; // get the name of tea to delete

  Product.deleteOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Product not found" });
    }
    // else return res.render('admin', { page: 'Home', products: products });
    else return res.json({ message: "deleted" });
  });
}

const absoluteCancel = (req, res, next) => {
  Product.deleteMany({}, err => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  })
}

module.exports = { getAllProducts, getSingleProduct, postProduct, deleteProduct };