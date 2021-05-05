const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage;

let localStorage = new LocalStorage('./scratch');


let customersData = fs.readFileSync("customers.json", "utf8");
let customers = JSON.parse(customersData);

// try {
//   let newCustomerOrder = JSON.parse(sessionStorage.getItem("lale:newCustomerOrder"));
//   if (newCustomerOrder) {
//     console.log(newCustomerOrder);
//   } else {
//     console.log('no new orders')
//   }
// } catch (err) {
//   console.log('error', err);
// }

const getCustomers = (req, res, next) => {


  console.log(localStorage.getItem('lale:productArray'))
  return;
  res.render('customers', { page: 'Customers', customers })
};

module.exports = {
  getCustomers
}