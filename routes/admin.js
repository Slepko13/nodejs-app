const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET request
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET request
router.get('/products', adminController.getProducts);

// /admin/add-product => POST request
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
