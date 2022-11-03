const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const products = [];

// /admin/add-product => GET request
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add-product',
        path: '/admin/add-product',
        productCSS: true,
        formCSS: true,
        activeProduct: true
    });
})

// /admin/add-product => POST request
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    console.log(products)
    res.redirect('/');
})



exports.router = router;
exports.products = products;
