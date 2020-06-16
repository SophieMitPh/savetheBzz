const router = require('express').Router(),
	productController = require('../controllers/productController'),
	usersController = require('../controllers/usersController'),
	subscribersController = require('../controllers/subscribersController');

router.post('/login', usersController
	.apiAuthenticate);

router.use(usersController.verifyJWT);
//router.use(usersController.checkAuthSessionOrJwt);

router.get('/products', productController.index,
	productController.filterUserProducts,
	productController.respondJSON);
router.get('/products/:id/add', productController.add, productController.respondJSON);
router.use(productController.errorJSON);

router.get('/users', usersController.index,
	usersController.respondJSON);
router.use(usersController.errorJSON);
router.get('/:id', usersController.show, usersController.showView);
router.post('/create',
	usersController.validate,
	usersController.create,
	usersController.redirectView
);

router.get('/subscribers', subscribersController.index,
	subscribersController.respondJSON);
router.use(subscribersController.errorJSON);
router.get('/:id', subscribersController.show, subscribersController.showView);

module.exports = router;