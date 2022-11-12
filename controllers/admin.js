const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add-product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, imageUrl, price, description } = req.body;
	let product = new Product(null, title, imageUrl, price, description);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAllProducts(products => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
};

exports.getEditProduct = (req, res, next) => {
	const prodId = req.params.productId;
	const editMode = req.query.edit;
	Product.findById(prodId, product => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', {
			product: product,
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			prodId,
			editing: !!editMode,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const { productId, title, imageUrl, price, description } = req.body;
	let product = new Product(productId, title, imageUrl, price, description);
	product.save();
	res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
	const { productId } = req.body;
	Product.deleteById(productId);
	res.redirect('/admin/products');
};
