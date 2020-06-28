const httpStatus = require('http-status-codes');
const User = require('../models/user');
const Cart = require('../models/cart')
const Product = require('../models/product')
const Wishlist = require('../models/wishlist')

module.exports = {
	getIndexPage: (req, res) => {
		res.render('home');
	},

	getProductDetailView: (req, res) => {
		let paramsName = req.params.product;
		res.render('products/productDetailView', {product: paramsName});
	},

	getCartView: (req, res, next) => {
		if(!req.session.cart){
			return res.render('cart', {products: null})
		}
		var cart = new Cart(req.session.cart)
		res.render('cart', {
			products: cart.generateArray(),
			totalPrice: cart.totalPrice
		})
	},

	addProductToCart: (req, res, next) => {
		var productId = req.params.id;
		var cart = new Cart (req.session.cart ? req.session.cart : {});
	
		Product.findById(productId, (err, product) => {
			if(err) {
				return res.redirect('/cart');
			}
			cart.add(product, product.id);
			req.session.cart = cart;
			console.log(req.session.cart);
			res.redirect('/cart');
		});
	},
	
	removeProductFromCart: (req, res, next) => {
		var productId = req.params.id;
		var cart = new Cart(req.session.cart ? req.session.cart : {});
		cart.remove(productId);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/cart');
	},

	getWishList: (req, res, next) => {
		if(!req.session.wishlist){
			console.log("no products in wishlist")
			return res.render('wishList', {products: null})
		}
		var wishlist = new Wishlist(req.session.wishlist)
		res.render('wishList', {
			products: wishlist.generateArray()
		})
	},

	addProductToWishlist: (req, res, next) => {
		var productId = req.params.id;
		var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});
	
		Product.findById(productId, (err, product) => {
			if (err) {
				return res.redirect('/wishlist');
			}
			wishlist.add(product, product.id);
			req.session.wishlist = wishlist;
			console.log(req.session.wishlist);
			res.redirect('/wishlist');
		});
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

	chat: (req, res) => {
		res.render("chat");
	}
};
