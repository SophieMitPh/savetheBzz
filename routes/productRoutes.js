const router = require('express').Router(),
	productController = require('../controllers/productController');

router.get('/productOverview', productController.getAllProducts);
router.get('/:name', productController.getDetailedView);
router.get('/', productController.index, productController.indexView);
router.get('/new', productController.new);
router.get('/:id', productController.show, productController.showView);
router.post('/create',
	productController.create,
	productController.redirectView);
router.get('/:id/edit', productController.edit);
router.put('/:id/update', productController.update, productController.redirectView);
router.delete( '/:id/delete',
	productController.delete,
	productController.redirectView
);

module.exports = router;