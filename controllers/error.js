exports.getError404 = (req, res, next) => {
  res.status(404).render('error-404', {
    pageTitle: 'Page not found',
    path: '/404',
    isAuth: req.session.isLoggedIn,
  });
};

exports.getError500 = (req, res, next) => {
  res.status(500).render('error-500', {
    pageTitle: 'Internal error',
    path: '/500',
    isAuth: req.session.isLoggedIn,
  });
};
