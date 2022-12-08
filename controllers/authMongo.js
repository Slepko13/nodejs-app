const User = require('../models/userMongo');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
	let message = req.flash('error');
	console.log(message);
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	console.log(message);
	res.render('auth/login', {
		pageTitle: 'Login Page',
		path: '/login',
		isAuth: false,
		errorMessage: message,
	});
};

exports.postLogin = (req, res, next) => {
	const { email, password } = req.body;
	User.findOne({ email })
		.then(user => {
			if (!user) {
				req.flash('error', 'Invalid email(just for test)');
				return res.redirect('/login');
			}
			bcrypt
				.compare(password, user.password)
				.then(match => {
					if (match) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save(err => {
							console.log(err);
							res.redirect('/');
						});
					}
					req.flash('error', 'Invalid password(just for test)');
					res.redirect('/login');
				})
				.catch(err => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/signup', {
		path: '/signup',
		pageTitle: 'Signup',
		isAuth: false,
		errorMessage: message,
	});
};

exports.postSignup = (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	User.findOne({ email: email })
		.then(userDoc => {
			if (userDoc) {
				req.flash('error', 'Email already exist, please try another');
				return res.redirect('/signup');
			}
			return bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				})
				.then(result => {
					res.redirect('/login');
				});
		})
		.catch(err => {
			console.log(err);
		});
};
