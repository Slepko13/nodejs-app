exports.getError = (req, res, next) => {
	res.status(404).render('error-page', {
		pageTitle: 'Error',
		path: '',
		isAuth: req.session.isLoggedIn,
	});
};
