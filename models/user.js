const mongoose = require('mongoose'),
	userSchema = mongoose.Schema({
		name: {
			first: {
				type: String,
				trim: true
			},
			last: {
				type: String,
				trim: true
			}
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
		wishlistItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		],
		timestamps: true,
	});

userSchema.virtual('fullName')
	.get(function() {
		return `${this.name.first} ${this.name.last}`;
	});

userSchema.methods.getInfo = function() {
	return `Name: ${this.name} Email: ${this.email}`;
};

userSchema.methods.findEmailUser = function() {
	return this.model('User')
		.find({email: this.email})
		.exec();
};

userSchema.methods.removeUsers = function() {
	return this.model('User')
		.remove({name: this.name})
		.exec();
};

module.exports = mongoose.model('User', userSchema);