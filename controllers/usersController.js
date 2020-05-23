const User = require('../models/user');
module.exports = {
	index: (req, res, next) => {
		User.find()
			.then(users => {
				res.locals.users = users;
				next();
			}).catch(error => {
				console.log(`Error fetching users: ${error.message}`);
				next(error);
			});
	},
	indexView: (req, res) => {
		res.render('users/index');
	},
	new: (req, res) => {
		res.render('signup');
	},
	create: (req, res, next) => {
		let userParams = {
			name: req.body.name,
			lastname: req.body.lastname,
			//{
				//first: req.body.name.first,
			//	last: req.body.name.last
			//},
			email: req.body.email,
			password: req.body.password,
		};
		User.create(userParams)
			.then(user => {
				res.render('contact', {
					name: userParams.name,
					lastname: userParams.lastname,
					email: userParams.email,
					password: userParams.password
				})
				res.locals.redirect = '/contact';
				res.locals.user = user;
				next();
			})
			.catch(error => {
				console.log(`Error saving user: ${error.message}`);
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();
	},
	show: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then(user => {
				res.locals.user = user;
				next();
			})
			.catch(error => {
				console.log(`Error fetching user by ID: ${error.message}`);
				next(error);
			});
	},
	showView: (req, res) => {
		res.render('users/show');
	}
};