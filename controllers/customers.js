const fs = require('fs');

let customersData = fs.readFileSync("customers.json", "utf8");
let customers = JSON.parse(customersData);

const getCustomers = (req, res, next) => {
  res.render('customers', { page: 'Customers', customers })
};

const addCustomer = (req, res, next) => {
  let data = {
    name: req.body.customerName,
    email: req.body.customerEmail,
    number: req.body.customerNumber,
    productName: req.body.customerProductName,
    productPrice: req.body.customerProductPrice,
    status: 'pending'
  };

  customers.push(data);

  fs.writeFileSync("customers.json", JSON.stringify(customers));
  res.redirect("/cart");
}

const markComplete = (req, res, next) => {
  // get single customer id 
  let id = req.params.id;

  // customer to be marked
  let customerEmail = '';
  let customerID = 0;

  for (let i = 0; i < customers.length; i++) {
    let num = i + 1;
    let tmp = num + '-' + customers[i].email;

    if (tmp === id) {
      customerID = num;
      customerEmail = customers[i].email;
    }
  }

  // loop through customer object to find match 
  for (let i = 0; i < customers.length; i++) {
    let num = i + 1;
    let tmp = customers[i];

    if (tmp.email == customerEmail && num == customerID) {
      customers[i].status = 'completed';
    }

  }

  fs.writeFileSync("customers.json", JSON.stringify(customers));
  res.redirect("/customers");

}

module.exports = {
  getCustomers,
  addCustomer,
  markComplete
}
