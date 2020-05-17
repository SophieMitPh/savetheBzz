const mongoose = require('mongoose'),
	productSchema = mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true
		}
	});

productSchema.methods.getInfo = () => {
	return this.model('Product')
		.find({name: this.name})
		.exec();
};

productSchema.methods.removeProducts = function() {
	return this.model('Product')
		.remove({name: this.name})
		.exec();
};

module.exports = mongoose.model('Product', productSchema);