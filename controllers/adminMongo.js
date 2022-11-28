const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Product = require('../models/productMongo');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add-product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, description, imageUrl } = req.body;
	const product = new Product(title, price, description, imageUrl);
	product
		.save()
		.then(() => {
			console.log('Product created');
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(products => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin products',
				path: '/admin/products',
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const prodId = req.params.productId;
	const editMode = req.query.edit;
	Product.findById(prodId)
		.then(product => {
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
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const { productId, title, imageUrl, price, description } = req.body;
	const product = new Product(
		title,
		price,
		description,
		imageUrl,
		new ObjectId(productId)
	);
	product
		.save()
		.then(result => {
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const { productId } = req.body;
	Product.deleteById(productId)
		.then(result => {
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};
