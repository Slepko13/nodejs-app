const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const path = require('path');

const app = express();


app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
    })
);
app.set ('view engine', 'hbs');
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
    res.status(404).render('error-page', {pageTitle: 'Error'})
})

app.listen(3000, () => {console.log("Server is running")});
