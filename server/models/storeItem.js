const mongoose = require('mongoose');

const StoreItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
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
});

const Item = mongoose.model('Item', StoreItemSchema);

module.exports = Item;
