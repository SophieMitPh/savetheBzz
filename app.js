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
const passport = require("passport");
const cookie = require("cookie-parser");
const session = require("express-session");
const User = require("./models/user"),
connectFlash = require("connect-flash"),
expressValidator = require("express-validator");

app.use('/', router);
router.use(cookie("secretCodeBzz"));
router.use(session({
	secret: "secretCodeBzz",
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());
router.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	next();
});
router.use(
	express.urlencoded({
		extended: false
	})
);
router.use(methodOverride('_method', {methods: ['POST', 'GET']}));
router.use(express.json());
router.use(expressValidator());
app.set('view engine', 'ejs');
router.use(layouts);
router.use(express.static('public'));

router.get('/', homeController.getIndexPage);

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new);
router.post('/users/create',
 usersController.validate,
 usersController.create,
 usersController.redirectView
);
router.get('/users/login', usersController.login);
router.post('/users/login', usersController.authenticate);
router.get('/users/logout', usersController.logout, usersController.redirectView);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id/update', usersController.update, usersController.redirectView);
router.get('/users/:id', usersController.show, usersController.showView);
router.delete( '/users/:id/delete', usersController.delete, usersController.redirectView);

router.get('/productOverview', productController.getAllProducts);
router.get('/product/:name', productController.getDetailedView);
router.get('/products', productController.index, productController.indexView);
router.get('/products/new', productController.new);
router.get('/products/:id', productController.show, productController.showView);
router.post('/products/create',
 productController.create, 
 productController.redirectView);
router.get('/products/:id/edit', productController.edit);
router.put('/products/:id/update', productController.update, productController.redirectView);
router.delete( '/products/:id/delete',
 productController.delete,
 productController.redirectView
);

router.get('/cart', homeController.getCartView);
router.get('/wishlist', homeController.getWishList);
router.get('/my-account/profile', homeController.getPersonalAccount);
router.get('/my-account/address', homeController.getShippingAddress);
router.get('/my-account/payment', homeController.getPaymentMethods);

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create',
 subscribersController.create,
 subscribersController.redirectView
);
router.get('/subscribers/:id/edit', subscribersController.edit);
router.put('/subscribers/:id/update',
 subscribersController.update,
 subscribersController.redirectView
);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
router.delete( '/subscribers/:id/delete',
 subscribersController.delete,
 subscribersController.redirectView
);

router.use(errorController.logErrors);
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

module.exports = app;