const User = require('../models/userMongo');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login Page',
		path: '/login',
		isAuth: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('6388cc5ddafcdefe7c302a71')
		.then(user => {
			console.log('user', user);
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(err => {
				console.log(err);
				res.redirect('/');
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
