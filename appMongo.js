const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/userMongo');

const adminRoutes = require('./routes/adminMongo');
const shopRoutes = require('./routes/shopMongo');
const errorController = require('./controllers/error');
const { ServerApiVersion } = require('mongodb');

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
	User.findById('6388cc5ddafcdefe7c302a71')
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

mongoose
	.connect(
		'mongodb+srv://node-complete:nodecomplete@cluster0.etxrz.azure.mongodb.net/shop?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		}
	)
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
