const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set ('view engine', 'pug');
//default behavior,  should be changed(second argument) in case we keep our templates in another folder(not  in views);
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html'))
})

app.listen(3000, () => {console.log("Server is running")});
