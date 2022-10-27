const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

// /admin/add-product => GET request
router.get('/add-product', (req, res, next) => {
    console.log("In the add-product");
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

// /admin/add-product => POST request
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    console.log("In the /product");
    res.redirect('/');
})


module.exports = router;
