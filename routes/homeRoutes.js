const router = require('express').Router(),
	homeController = require('../controllers/homeController');

router.get('/', homeController.getIndexPage);
router.get('/chat', homeController.chat);

router.get('/admin', homeController.getAdminView);

router.get('/cart', homeController.getCartView);
router.get('/cart/add/:id', homeController.addProductToCart);
router.get('/cart/remove/:id', homeController.removeProductFromCart);
router.get('/wishlist', homeController.getWishList);
router.get('/wishlist/add/:id', homeController.addProductToWishlist);

router.get('/:id/my-account/profile', homeController.getPersonalAccount);
router.get('/:id/my-account/profile/edit', homeController.editPersonalAccount);
router.put('/:id/my-account/profile/update', homeController.updateAccount, homeController.redirectView);

router.get('/:id/my-account/address', homeController.getShippingAddress);
router.get('/:id/my-account/address/edit', homeController.editShippingAddress);
router.put('/:id/my-account/address/update', homeController.updateAddress, homeController.redirectView);

router.get('/:id/my-account/payment', homeController.getPaymentMethods);
router.get('/:id/my-account/payment/edit', homeController.editPaymentMethods);
router.put('/:id/my-account/payment/update', homeController.updatePayment, homeController.redirectView);

module.exports = router;