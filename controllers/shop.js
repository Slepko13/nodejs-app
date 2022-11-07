const Shop = require('../models/product');

exports.getProducts = (req, res, next) => {
     Shop.fetchAllProducts(products => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: "All products",
            path: '/products',
        });
    });
};

exports.getIndex = (req, res, next) => {
    Shop.fetchAllProducts(products => {
        res.render('shop/index',{
            prods: products,
            pageTitle: "Index Page",
            path: '/',
        });
    });
};

exports.getCart = (req, res, next) => {
        res.render('shop/cart',{
            pageTitle: "Cart Page",
            path: '/cart',
        });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders',{
        pageTitle: "Orders Page",
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        pageTitle: "Checkout Page",
        path: '/checkout',
    });
};
