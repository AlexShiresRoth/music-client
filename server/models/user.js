const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	orders: [
		{
			name: {
				type: String,
				required: true,
			},
			total: {
				type: String,
				required: true,
			},
			purchaseDate: {
				type: Date,
				default: Date.now,
			},
			description: {
				type: String,
			},
			email: {
				type: String,
				required: true,
			},
			purchased: {
				type: Boolean,
			},
			payment: {
				type: String,
			},
			items: [
				{
					name: {
						type: String,
						required: true,
					},
					amount: {
						type: String,
						required: true,
					},
					image: {
						type: String,
						required: true,
					},
					description: {
						type: String,
						required: true,
					},

					total: {
						type: String,
					},
					quantity: {
						type: String,
						required: true,
					},
				},
			],
		},
	],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
