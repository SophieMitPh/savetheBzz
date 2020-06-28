const router = require('express').Router(),
	homeController = require('../controllers/homeController');
const Cart = require('../models/cart')
const Wishlist = require('../models/wishlist')
const Product = require('../models/product');
router.get('/', homeController.getIndexPage);
router.get('/chat', homeController.chat);

router.get('/cart', homeController.getCartView);
router.get('/cart/add/:id', homeController.addProductToCart);
router.get('/cart/remove/:id', homeController.removeProductFromCart);
router.get('/wishlist', homeController.getWishList);
router.get('/wishlist/add/:id', homeController.addProductToWishlist);
router.get('/:id/my-account/profile', homeController.getPersonalAccount);
router.get('/:id/my-account/address', homeController.getShippingAddress);
router.get('/:id/my-account/payment', homeController.getPaymentMethods);

module.exports = router;