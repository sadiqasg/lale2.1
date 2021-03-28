const Product = require('../models/product');

let products;

const getKitchenProducts = (req, res, next) => {
  Product.find({name: 'doc'}, (err, data) => {
    if (err) {
      return res.send({ "Failed": err });
    }
    res.render('client/kitchen', { page: 'Kitchen', products: data })
  })
};

module.exports = {
  getKitchenProducts
}

// const getSingleProduct = (req, res, next) => {
//   let id = req.params.id;

//   Product.findOne({ _id: id }, (err, data) => {
//     if (err || !data) {
//       return res.json({ message: "Product not found" });
//     }
//     else {
//       let img = data.image;
//       let images = img.split(",");
//       if (images.length > 1) {
//         return res.render('product-detail', { page: 'Details', product: data, images: images });
//       }
//       return res.render('product-detail', { page: 'Details', product: data, images: null });

//     }
//   });
// };