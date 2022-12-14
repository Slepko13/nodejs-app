const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const adminController = require('../controllers/adminMongo');
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isDataURI(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 50 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product/',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isDataURI(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 50 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
