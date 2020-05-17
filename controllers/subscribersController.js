const mongoose = require('mongoose'),
	Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res, next) => {
	Subscriber.find({})
		.exec()
		.then ((subscribers) => {
			res.render('subscribers', {
				subscribers: subscribers
			});
		}).catch((error) => {
			console.log(error.message);
			return [];
		}).then(() => {
			console.log('Promise complete');
		}); 
};

exports.getSignUp = (req, res) => {
	res.render('signUp');
};

exports.showSignUp = (req, res) => {
	let signUpData = req.body;
	let newSubscriber = new Subscriber({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email
	});
	newSubscriber.save().then((result) => {
		res.render('contact', { name: signUpData.name, lastname: signUpData.lastname, email: signUpData.email });
	}).catch(error => {
		res.send(error);
	});
};