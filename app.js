const express = require('express'),
	app = express();
const
	router = require('./routes/index');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');
const User = require('./models/user'),
	connectFlash = require('connect-flash'),
	expressValidator = require('express-validator');

router.use(cookie('secretCodeBzz'));
router.use(session({
	secret: 'secretCodeBzz',
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
app.use(express.static(__dirname + '/public'));

app.use('/', router);

module.exports = app;