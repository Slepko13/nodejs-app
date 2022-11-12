const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			console.log(cart);
			const existingProductIndex = cart.products.findIndex(
				prod => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty += 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice += +productPrice;
			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		console.log(id, productPrice);
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return;
			}
			let cart = JSON.parse(fileContent);
			const product = cart.products.find(product => product.id === id);
			if (!product) {
				return;
			}
			const qty = product.qty;
			cart.products = [...cart.products.filter(prod => prod.id !== id)];
			cart.totalPrice -= qty * +productPrice;
			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		fs.readFile(p, (err, fileContent) => {
			let cart = JSON.parse(fileContent);
			if (err) {
				console.log(err);
			} else {
				cart = JSON.parse(fileContent);
				cb(cart);
			}
		});
	}
};
