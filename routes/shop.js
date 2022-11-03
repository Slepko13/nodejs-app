const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log("In the /");
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop',{prods: products, title: "My pug title"});
})


module.exports = router;
