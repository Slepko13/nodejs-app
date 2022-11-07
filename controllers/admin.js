const Shop = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add-product',
        path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const {title, imageUrl, price, description} = req.body;
    let product = new Shop(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Shop.fetchAllProducts(products => {
        res.render('admin/products',{
            prods: products,
            pageTitle: "Admin products",
            path: '/admin/products',
        });
    });
};
