const mongoose = require('mongoose'),
	subscriberSchema = mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		lastname: {
			type : String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: [7, 'Your password needs to be at least 7 characters'],
		},
	});

subscriberSchema.methods.getInfo = function() {
	return `Name: ${this.name} Email: ${this.email}`;
};

subscriberSchema.methods.findEmailSubscribers = function() {
	return this.model('Subscriber')
		.find({email: this.email})
		.exec();
};

subscriberSchema.methods.removeSubscribers = function() {
	return this.model('Subscriber')
		.remove({name: this.name})
		.exec();
};

module.exports = mongoose.model('Subscriber', subscriberSchema);