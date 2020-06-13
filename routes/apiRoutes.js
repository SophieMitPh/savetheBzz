const router = require('express').Router(),
	productController = require('../controllers/productController');
router.get('/products', productController.index,
	productController.filterUserProducts,
	productController.respondJSON);
router.get('/products/:id/add', productController.add, productController.respondJSON);
router.use(productController.errorJSON);
module.exports = router;