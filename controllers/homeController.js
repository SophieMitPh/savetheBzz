const httpStatus = require('http-status-codes');

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

	getPersonalAccount: (req, res) => {
		res.render('account/account');
	},

	getShippingAddress: (req, res) => {
		res.render('account/address');
	},

	getPaymentMethods: (req, res) => {
		res.render('account/payment');
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
