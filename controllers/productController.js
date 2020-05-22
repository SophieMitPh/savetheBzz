const mongoose = require('mongoose'),
	Product = require('../models/product');
module.exports = {
	newProduct: (req, res) => {
		res.send(req.data.name);
	},

	index: (req, res, next) => {
		Product.find()
			.then(products => {
				res.locals.products = products;
				next();
			}).catch(error => {
				console.log(`Error fetching users: ${error.message}`);
				next(error);
			});
	},
	indexView: (req, res) => {
		res.render('products/index');
	},

	getProductDetailView: (req, res) => {
		let paramsName = req.params.productName;
		Product.findOne({name: paramsName}).exec().then((p) => {
			res.render('productDetailView', {productName: paramsName, description: p.description, price: p.price});
		});
	},

	getAddProductView: (req, res) => {
		res.render('addProduct');
	},

	getAllProducts: (req, res, next) => {
		Product.find({})
			.exec()
			.then((products) => {
				res.render('productOverview', {
					products: products
				});
			}).catch((error) => {
				console.log(error.message);
				return [];
			}).then(() => {
				console.log('Promise complete');
			});
	},

	saveProduct: (req, res, next) => {
		let newProduct = new Product({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price
		});

		newProduct.save((error, result) => {
			if (error) res.send(error);
			let productName = req.body.name;
			let productDescription = req.body.description;
			let productPrice = req.body.price;
			res.render('productDetailView', {
				productName: productName,
				description: productDescription,
				price: productPrice
			});
		});
	},
};