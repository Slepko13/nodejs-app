const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoBDStore = require('connect-mongodb-session')(session);

const User = require('./models/userMongo');
const authRoutes = require('./routes/authMongo');
const adminRoutes = require('./routes/adminMongo');
const shopRoutes = require('./routes/shopMongo');
const errorController = require('./controllers/error');
const { ServerApiVersion } = require('mongodb');

const MONGODB_URI =
	'mongodb+srv://node-complete:nodecomplete@cluster0.etxrz.azure.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store = new MongoBDStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
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
app.use(authRoutes);

app.use(errorController.getError);

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	})
	.then(res => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					username: 'Fosfat',
					email: 'fosfat1980@gmail.com',
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});

		app.listen(3000, () => {
			console.log('Server is running');
		});
	})
	.catch(err => {
		console.log(err);
	});
