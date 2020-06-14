const httpStatus = require('http-status-codes');
const User = require('../models/user');
Product = require('../models/product'),
getProductParams = (body) => {
	return {
		name: body.name,
		description: body.description,
		price: parseFloat(body.price)
	};
};

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
				console.log(`Error fetching products: ${error.message}`);
				next(error);
			});
	},
	indexView: (req, res) => {
		res.render('products/index');
	},

	new: (req, res) => {
		res.render('products/new');
	},

	create: (req, res, next) => {
		let productParams = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price
		};
		Product.create(productParams)
			.then(product => {
				res.locals.redirect = '/products';
				res.locals.product = product;
				next();
			})
			.catch(error => {
				console.log(`Error saving product: ${error.message}`);
				res.send(`Error saving product: ${error.message}`);
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();
	},

	show: (req, res, next) => {
		let productId = req.params.id;
		Product.findById(productId)
			.then(product => {
				res.locals.product = product;
				next();
			})
			.catch(error => {
				console.log(`Error fetching product by ID: ${error.message}`);
				next(error);
			});
	},
	showView: (req, res) => {
		res.render('products/show');
	},

	edit: (req, res, next) => {
		let productId = req.params.id;
		Product.findById(productId)
			.then(product => {
				res.render('products/edit', {
					product: product
				});
			})
			.catch(error => {
				console.log(`Error fetching products by ID: ${error.message}`);
				next(error);
			});
	},
	update: (req, res, next) => {
		let productId = req.params.id,
			productParams = {
				name: req.body.name,
				description: req.body.description,
				price: parseFloat(req.body.price)
			};
		Product.findByIdAndUpdate(productId, {
			$set: productParams
		})
			.then(product => {
				res.locals.redirect = `/products/${productId}`;
				res.locals.product = product;
				next();
			})
			.catch(error => {
				console.log(`Error updating product by ID: ${error.message}`);
				next(error);
			});
	},

	delete: (req, res, next) => {
		let productId = req.params.id;
		Product.findByIdAndRemove(productId)
			.then(() => {
				res.locals.redirect = '/products';
				next();
			})
			.catch(error => {
				console.log(`Error deleting product by ID: ${error.message}`);
				next();
			});
	},
	getAllProducts: (req, res) => {
		Product.find({})
			.exec()
			.then((products) => {
				res.render('products/productOverview', {
					products: products
				});
			}).catch((error) => {
				console.log(error.message);
				return [];
			}).then(() => {
				console.log('Promise complete');
			});
	},

	getDetailedView: (req, res) => {
		let productName = req.params.name;
		Product.findOne({ name: productName })
			.exec()
			.then((product) => {
				res.locals.product = product;
				res.render('products/productDetailView',
					{
						name: product.name,
						description: product.description,
						price: product.price
					});
			})
			.catch((error) => {
				console.log(error.message);
			});
	},
	respondJSON: (req, res) => {
		res.json({
			status: httpStatus.OK,
			data: res.locals
		});
	},
	errorJSON: (error, req, res, next) => {
		let errorObject;
		if (error) {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: error.message
			};
		} else {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: 'Unknown Error.'
			};
		}
		res.json(errorObject);
	},
	add: (req, res, next) => {
		let productId = req.params.id,
			currentUser = req.user;
		if (currentUser) {
			User.findByIdAndUpdate(currentUser, {
				$addToSet: {
					products: productId
				}
			})
				.then(() => {
					res.locals.success = true;
					next();
				})
				.catch(error => {
					next(error);
				});
		} else {
			next(new Error('User must log in.'));
		}
	},
	filterUserProducts: (req, res, next) => {
		let currentUser = res.locals.currentUser;
		if (currentUser) {
			let mappedProducts = res.locals.products.map((product) => {
				let productAdded = currentUser.products.some((userProduct) => {
					return userProduct.equals(product._id);
				});
				return Object.assign(product.toObject(), {added: productAdded});
			});
			res.locals.products = mappedProducts;
			next();
		} else {
			next();
		}
	},
};