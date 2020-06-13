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
		//every subscriber can add the product to the card even not being signed in.
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		]	
	}, 
	{ 
		timeStamps: true
	}
	);
subscriberSchema.virtual('fullName')
	.get(function() {
		return `${this.name} ${this.lastname}`;
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