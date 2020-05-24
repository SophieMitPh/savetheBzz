const express = require('express'),
	app = express();
router = express.Router();
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
app.use('/', router);
router.use(
	express.urlencoded({
		extended: false
	})
);
router.use(methodOverride('_method', {methods: ['POST', 'GET']}));
router.use(express.json());
app.set('view engine', 'ejs');
router.use(layouts);
router.use(express.static('public'));
router.get('/', homeController.getIndexPage);

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new);
router.get('/users/:id', usersController.show, usersController.showView);
router.post('/users/create', usersController.create, usersController.redirectView);

router.get('/products/index', productController.index, productController.indexView);
//router.get('/signUp', subscribersController.getSignUp);
//router.post('/contact', usersController.showSignUp);
router.get('/products', productController.getAllProducts);
router.get('/product/:productName', productController.getProductDetailView);
router.get('/cart', homeController.getCartView);
router.get('/wishlist', homeController.getWishList);
router.get('/addProduct', productController.getAddProductView);
router.post('/newProduct', productController.saveProduct);
//routes for subscriber created but not checked yet
router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView);
router.get('subscribers/:id/edit', subscribersController.edit);
router.put('/subscribers/:id/update',  subscribersController.update, subscribersController.redirectView);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
router.delete( '/subscribers/:id/delete', subscribersController.delete, subscribersController.redirectView);

router.use(errorController.logErrors);
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

module.exports = app;