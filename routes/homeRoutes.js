const router = require('express').Router(),
	homeController = require('../controllers/homeController');

router.get('/', homeController.getIndexPage);

router.get('/cart', homeController.getCartView);
router.get('/wishlist', homeController.getWishList);
router.get('/my-account/profile', homeController.getPersonalAccount);
router.get('/my-account/address', homeController.getShippingAddress);
router.get('/my-account/payment', homeController.getPaymentMethods);

module.exports = router;