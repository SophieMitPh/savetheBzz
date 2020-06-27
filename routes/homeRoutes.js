const router = require('express').Router(),
	homeController = require('../controllers/homeController');
const Cart = require('../models/cart')
const Wishlist = require('../models/wishlist')
const Product = require('../models/product');
router.get('/', homeController.getIndexPage);
router.get('/chat', homeController.chat);

router.get('/cart', (req, res, next) => {
	if(!req.session.cart){
		return res.render('cart', {products: null})
	}
	var cart = new Cart(req.session.cart)
	res.render('cart', {
		products: cart.generateArray(),
		totalPrice: cart.totalPrice
	})
});
router.get('/cart/add/:id', function(req, res, next){
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
});

router.get('/wishlist', (req, res, next) => {
	if(!req.session.wishlist){
		console.log("no products in wishlist")
		return res.render('wishList', {products: null})
	}
	var wishlist = new Wishlist(req.session.wishlist)
	res.render('wishList', {
		products: wishlist.generateArray()
	})
});

router.get('/wishlist/add/:id', function (req, res, next) {
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
});
router.get('/:id/my-account/profile', homeController.getPersonalAccount);
router.get('/:id/my-account/address', homeController.getShippingAddress);
router.get('/:id/my-account/payment', homeController.getPaymentMethods);

module.exports = router;