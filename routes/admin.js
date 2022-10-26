const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log("In the add-product");
    res.send('<form action="/product" method="POST"><input type="text" name="title" ><button type="submit" >Send data</button></form>');
})

router.post('/product', (req, res, next) => {
    console.log(req.body);
    console.log("In the /product");
    res.redirect('/');
})


module.exports = router;
