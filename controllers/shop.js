const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAllProducts(products => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All products',
			path: '/products',
		});
	});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId, product => {
		res.render('shop/product-details', {
			prod: product,
			pageTitle: 'Product' + ' ' + prodId,
			path: '/products',
			prodId,
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAllProducts(products => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Index Page',
			path: '/',
		});
	});
};

exports.getCart = (req, res, next) => {
	Cart.getCart(cart => {
		const { totalPrice } = cart;
		Product.fetchAllProducts(products => {
			const cartProducts= [];
			for ( product of products ) {
				const cartProductData = cart.products.find(prod => prod.id === product.id)
				if (cartProductData ) {
					cartProducts.push({productData: product, qty: cartProductData.qty})
				}
			}
				res.render('shop/cart', {
				products: cartProducts,
				pageTitle: 'Cart Page',
				path: '/cart',
				totalPrice: totalPrice
			});
		})
	})
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.addProduct(prodId, product.price);
		res.redirect('/cart');
	});

};

exports.postCartDeleteProduct = ( req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart')
	})
}

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Orders Page',
		path: '/orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout Page',
		path: '/checkout',
	});
};
