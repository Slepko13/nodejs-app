const Product = require('../models/productMongo');

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'Product Page',
				path: '/products',
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then(product => {
			res.render('shop/product-details', {
				prod: product,
				pageTitle: 'Product' + ' ' + prodId,
				path: '/products',
				prodId,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getIndex = (req, res, next) => {
	Product.find()
		.then(products => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Index Page',
				path: '/',
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then(products => {
			res.render('shop/cart', {
				products: products,
				pageTitle: 'Cart Page',
				path: '/cart',
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then(product => {
			return req.user.addToCart(product);
		})
		.then(result => {
			console.log('post cart result', result);
			res.redirect('/cart');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.deleteItemFromCart(prodId)
		.then(result => {
			res.redirect('/cart');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.addOrder()
		.then(() => {
			res.redirect('/orders');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then(orders => {
			console.log('orders', orders);
			res.render('shop/orders', {
				orders: orders,
				pageTitle: 'Orders Page',
				path: '/orders',
			});
		})
		.catch(err => {
			console.log(err);
		});
};
