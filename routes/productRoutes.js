const router = require('express').Router(),
	productController = require('../controllers/productController');

router.get('/', productController.index, productController.indexView);
router.get('/productOverview', productController.getAllProducts);
router.get('/new', productController.new);
router.post('/create',
	productController.create,
	productController.redirectView);
router.get('/:id/edit', productController.edit);
router.put('/:id/update', productController.update, productController.redirectView);
router.get('/:id', productController.show, productController.showView);
router.get('/product/:name', productController.getDetailedView);
router.delete( '/:id/delete',
	productController.delete,
	productController.redirectView
);

module.exports = router;