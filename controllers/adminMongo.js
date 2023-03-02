const { validationResult } = require('express-validator');
const fileHelper = require('../util/file');

const Product = require('../models/productMongo');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add-product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = req.body;
  const image = req.file;
  console.log('image', image);
  if (!image) {
    console.log('in error');
    return res.status(422).render('admin/edit-product', {
      product: {
        title,
        price,
        description,
      },
      pageTitle: 'Add Product',
      hasError: true,
      path: '/admin/edit-product',
      editing: false,
      errorMessage:
        'Attached file has incorrect format(only phg, jpg, jpeg are allowed)',
      validationErrors: [],
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      product: {
        title,
        price,
        description,
      },
      pageTitle: 'Add Product',
      hasError: true,
      path: '/admin/edit-product',
      editing: false,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  const imageUrl = image.path;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'username')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin products',
        path: '/admin/products',
        isAuth: req.session.isLoggedIn,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: !!editMode,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, description } = req.body;
  const image = req.file;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      product: {
        title,
        price,
        description,
        _id: productId,
      },
      pageTitle: 'Edit Product',
      hasError: true,
      path: '/admin/edit-product',
      editing: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  Product.findById({ _id: productId })
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = title;
      product.price = price;
      product.description = description;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }

      return product.save().then(result => {
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  console.log(productId);
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return next(new Error('Product nof found'));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: productId, userId: req.user._id });
    })
    .then(result => {
      res.status(200).json({
        message: 'Deleting success',
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Deleting failed',
      });
    });
};
