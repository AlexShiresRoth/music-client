const mongoose = require('mongoose');

const StoreItemSchema = new mongoose.Schema({
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
	quantity: {
		type: String,
		required: true,
	},
	uploadDate: {
		type: Date,
		default: Date.now,
	},
});

const Item = mongoose.model('Item', StoreItemSchema);

module.exports = Item;
