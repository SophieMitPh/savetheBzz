const passport = require('passport');
const httpStatus = require('http-status-codes');
const jsonWebToken = require('jsonwebtoken');
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
		res.render('users/new');
	},
	validate: (req, res, next) => {
		req
			.sanitizeBody('email')
			.normalizeEmail({
				all_lowercase: true
			})
			.trim();
		req.check('email', 'Email is invalid').isEmail();
		req.check('password', 'Password cannot be empty').notEmpty();
		req.getValidationResult().then((error) => {
			if (!error.isEmpty()) {
				let messages = error.array().map(e => e.msg);
				req.skip = true;
				req.flash('error', messages.join(' and '));
				res.locals.redirect = '/users/new';
				next();
			} else {
				next();
			}
		});
	},
	create: (req, res, next) => {
		if (req.skip) next();

		let userParams = {
			name: {
				first: req.body.first,
				last: req.body.last
			},
			email: req.body.email,
			password: req.body.password,
			address: {
					country: req.body.country,
					street: req.body.street
			},
			payment: {
					card: req.body.card
			}
		};
		let newUser = new User(userParams);
		User.register(newUser, req.body.password, (e, user) => {
			if (user) {
				req.flash('success', `${user.fullName}'s account created successfully!`);
				res.locals.redirect = '/users';
				//res.locals.user = user;
				next();
			} else {
				req.flash('error', `Failed to create user account because: ${e.message}.`);
				res.locals.redirect = '/users/new';
				next();
			}
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
	},
	edit: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then(user => {
				res.render('users/edit', {
					user: user
				});
			})
			.catch(error => {
				console.log(`Error fetching user by ID: ${error.message}`);
				next(error);
			});
	},
	update: (req, res, next) => {
		let userId = req.params.id,
			userParams = {
				name: {
					first: req.body.first,
					last: req.body.last,
				},
				email: req.body.email,
				password: req.body.password,
			};
		User.findByIdAndUpdate(userId, {
			$set: userParams
		})
			.then(user => {
				res.locals.redirect = `/users/${userId}`;
				res.locals.user = user;
				next();
			})
			.catch(error => {
				console.log(`Error updating user by ID: ${error.message}`);
				next(error);
			});
	},
	delete: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndRemove(userId)
			.then(() => {
				res.locals.redirect = '/users';
				next();
			})
			.catch(error => {
				console.log(`Error deleting user by ID: ${error.message}`);
				next();
			});
	},
	login: (req, res) => {
		res.render('users/login');
	},

	authenticate: passport.authenticate('local', {
		failureRedirect: '/users/login',
		failureFlash: 'Failed to login.',
		successRedirect: '/',
		successFlash: 'Logged in!'
	}),

	logout: (req, res, next) => {
		req.logout();
		req.flash('success', 'You have been logged out!');
		res.locals.redirect = '/';
		next();
	},
	respondJSON: (req, res) => {
		res.json({
			status: httpStatus.OK,
			data: res.locals
		});
		
	},
	errorJSON: (error, req, res, next) => {
		let errorObject;
		if (error) {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: error.message
			};
		} else {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: 'Unknown Error.'
			};
		}
		res.json(errorObject);
	},
	
	apiAuthenticate: (req, res, next) => {
		passport.authenticate('local', (errors, user) => {
			if (user) {
				let signedToken = jsonWebToken.sign(
					{
						data: user._id,
						exp: new Date().setDate(new Date().getDate() + 1)
					},
					'secret_encoding_passphrase'
				);
			//	req.session.token = signedToken
				res.json({
					success: true,
					token: signedToken
				});
			} else{
				res.json({
					success: false,
					message: 'Could not authenticate user.'
				});
			}
				
		})(req, res, next);;
	},

	checkAuthSessionOrJwt: (req, res, next) => {
		if (req.isAuthenticated()){ next();}
		const token = req.headers.token;
		console.log(token)
		if (token) {
			jsonWebToken.verify(
				token,
				'secret_encoding_passphrase',
				(errors, payload) => {
					if (payload) {
						User.findById(payload.data).then(user => {
							if (user) {
								next();
							} else {
								res.status(httpStatus.FORBIDDEN).json({
									error: true,
									message: 'No User account found.'
								});
							}
						});
					} else {
						res.status(httpStatus.UNAUTHORIZED).json({
							error: true,
							message: 'Cannot verify API token.'
						});
						next();
					}
				});
		}
	}
};