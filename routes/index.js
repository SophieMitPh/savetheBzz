const express = require('express');
const router = require('express').Router(),
	expressValidator = require('express-validator');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const passport = require('passport');
const cookie = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./../models/user'),
	connectFlash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

router.use(cookie('secretCodeBzz'));
router.use(session({
	secret: 'secretCodeBzz',
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection})
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
	res.locals.session = req.session;
	next();
});
router.use(
	express.urlencoded({
		extended: false
	})
);
router.use(methodOverride('_method', {methods: ['POST', 'GET']}));
router.use(expressValidator());
router.use(layouts);
router.use(expressValidator());

userRoutes = require('./userRoutes'),
subscriberRoutes = require('./subscriberRoutes'),
productRoutes = require('./productRoutes'),
	apiRoutes = require('./apiRoutes'),
homeRoutes = require('./homeRoutes'),
errorRoutes = require('./errorRoutes');
router.use('/users', userRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/products', productRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/', errorRoutes);
module.exports = router;