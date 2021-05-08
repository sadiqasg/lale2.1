const express = require('express');
const router  = express.Router(); 
const customersController = require('../controllers/customers');

router.get('/', customersController.getCustomers);
router.post('/', customersController.addCustomer);
router.get('/:id', customersController.markComplete);

module.exports = router;
