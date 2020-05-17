const mongoose = require('mongoose'),
	Product = require('./models/product');
mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/save-the-bzz',
	{ useNewUrlParser: true }
);

Product.remove({})
	.then(() => {
		return Product.create({
			name: 'Pleated Smock Midi Dress',
			price: 69,
			description: 'Pleated midi dress finished with smocked details at shoulders, waist and cuffs.'
		});
	})
	.then(product => console.log(product.name))
	.then(() => {
		return Product.create({
			name: 'Sterling Silver Twisted Hoop Earrings',
			price: 26,
			description: 'Gold-toned open frame mini hoop earrings in a gently twisted, organic finish.'
		});
	})
	.then(product => console.log(product.name))
	.then(() => {
		return Product.create({
			name: 'Semi Sheer Floral Print Blouse',
			price: 48,
			description: 'Sheer relaxed blouse in a floral print with topstitch detailing along the collar, cuffs and hem.'
		});
	})
	.then(product => console.log(product.name))
	.then(() => {
		return Product.create({
			name: 'Ribbed Button Up Swimsuit',
			price: 35,
			description: 'Ribbed square neck one piece swimsuit with five button closures and a low cut back.'
		});
	})
	.then(product => console.log(product.name))
	.then(() => {
		return Product.create({
			name: 'Gathered Leather O-Ring Bag',
			price: 102,
			description: 'Smooth leather bag in a gathered, multi-draped finish. Featuring gold toned O-ring connectors and two straps for versatile wearing.'
		});
	})
	.then(product => console.log(product.name))
	.catch(error => console.log(error.message))
	.then(() => {
		console.log('DONE');
		mongoose.connection.close();
	});