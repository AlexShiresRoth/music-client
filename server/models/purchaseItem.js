const mongoose = require('mongoose');

const PurchaseItemSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
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
	orderId: {
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
});

const PurchaseItem = mongoose.model('PurchaseItem', PurchaseItemSchema);

module.exports = PurchaseItem;
