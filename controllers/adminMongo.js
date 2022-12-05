const Product = require('../models/productMongo');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add-product',
		path: '/admin/add-product',
		editing: false,
		isAuth: req.session.isLoggedIn,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, description, imageUrl } = req.body;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: req.user,
	});
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
	Product.find()
		// .select('title price -_id')
		// .populate('userId', 'username')
		.then(products => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin products',
				path: '/admin/products',
				isAuth: req.session.isLoggedIn,
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
				isAuth: req.session.isLoggedIn,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const { productId, title, imageUrl, price, description } = req.body;
	Product.findById({ _id: productId })
		.then(product => {
			product.title = title;
			product.price = price;
			product.description = description;
			product.imageUrl = imageUrl;
			return product.save();
		})
		.then(result => {
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const { productId } = req.body;
	Product.findOneAndRemove({ _id: productId })
		.then(result => {
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};
