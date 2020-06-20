const router = require('express').Router(),
	homeController = require('../controllers/homeController');

router.get('/', homeController.getIndexPage);
router.get('/chat', homeController.chat);
router.get('/cart', homeController.getCartView);
router.get('/wishlist', homeController.getWishList);
router.get('/:id/my-account/profile', homeController.getPersonalAccount);
router.get('/:id/my-account/address', homeController.getShippingAddress);
router.get('/:id/my-account/payment', homeController.getPaymentMethods);

module.exports = router;