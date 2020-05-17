const mongoose = require('mongoose'),
	Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res) => {
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
		email: req.body.email,
		password: req.body.password
	});
	newSubscriber.save().then(() => {
		res.render('contact', { name: signUpData.name, lastname: signUpData.lastname, email: signUpData.email, password: signUpData.password });
	}).catch(error => {
		res.send(error);
	});
};