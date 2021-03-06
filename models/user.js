const Subscriber = require('../models/subscriber');
const randToken = require('rand-token');
const mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	userSchema = mongoose.Schema({
		name: {
			first: {
				type: String,
				trim: true
			},
			last: {
				type: String,
				trim: true,
			},
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
		address: {
				country: {
					type: String,
					default: 'Empty',
					trim: true
				},
				street: {						
					type: String,
					default: 'Empty',
					trim: true
				}
		},
		payment: {
				card: {
					type: Number,
					default: 0
				},
				holder: {
					type: String,
					default: "Empty"
				}
		},
		wishlistItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		],
		subscribedAccount: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Subscriber'},
		products: [
			{
				type:mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		]
	},
	{ 
		timeStamps: true
	},
	);

userSchema.virtual('fullName')
	.get(function() {
		return `${this.name.first} ${this.name.last}`;
	});
	
userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email'
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

/*userSchema.pre('save', function(next) {
	let user = this;
	if (!user.apiToken) user.apiToken = randToken.generate(16);
	next();
});*/

userSchema.pre('save', function (next) {
	let user = this;
	if (user.subscribedAccount === undefined) {
		Subscriber.findOne({
			email: user.email
		})
			.then(subscriber => {user.subscribedAccount = subscriber;
				next();
			})
			.catch(error => {
				console.log(`Error in connecting subscriber:${error.message}`);
				next(error);
			});
	} else {
		next();
	}
});

module.exports = mongoose.model('User', userSchema);