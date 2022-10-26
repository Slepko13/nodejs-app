const express = require('express');

const router = express.Router();


// /admin/add-product => GET request
router.get('/add-product', (req, res, next) => {
    console.log("In the add-product");
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title" ><button type="submit" >Send data</button></form>');
})

// /admin/add-product => POST request
router.post('/product', (req, res, next) => {
    console.log(req.body);
    console.log("In the /product");
    res.redirect('/');
})


module.exports = router;
