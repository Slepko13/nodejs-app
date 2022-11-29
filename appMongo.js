const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/userMongo');

const adminRoutes = require('./routes/adminMongo');
const shopRoutes = require('./routes/shopMongo');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/databaseMongo').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('6384dfa1e9e4123cc9a04fee')
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

mongoConnect(() => {
	app.listen(3000, () => {
		console.log('Server is running');
	});
});
