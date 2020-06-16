const httpStatus = require('http-status-codes');
const User = require('../models/user');
module.exports = {
	getIndexPage: (req, res) => {
		res.render('home');
	},

	getProductDetailView: (req, res) => {
		let paramsName = req.params.product;
		res.render('products/productDetailView', {product: paramsName});
	},

	getCartView: (req, res) => {
		res.render('cart');
	},

	getWishList: (req, res) => {
		res.render('wishList');
	},

	getPersonalAccount: (req, res, next) => {
			let userId = req.params.id;
			User.findById(userId)
				.then(user => {
					res.locals.user = user;
					res.render('account/account', {
						user: user
					});
				})
				.catch(error => {
					console.log(`Error fetching user by ID: ${error.message}`);
					next(error);
				});
	},

	getShippingAddress: (req, res) => {
		let userId = req.params.id;
			User.findById(userId)
				.then(user => {
					res.locals.user = user;
					res.render('account/address', {
						user: user
					});
				})
				.catch(error => {
					console.log(`Error fetching user by ID: ${error.message}`);
					next(error);
				});
	},

	getPaymentMethods: (req, res) => {
		let userId = req.params.id;
		User.findById(userId)
			.then(user => {
				res.locals.user = user;
				res.render('account/payment', {
					user: user
				});
			})
			.catch(error => {
				console.log(`Error fetching user by ID: ${error.message}`);
				next(error);
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
};
