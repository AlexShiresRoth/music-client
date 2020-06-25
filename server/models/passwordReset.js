const mongoose = require('mongoose');

const PasswordResetItemSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	email: {
		type: String,
		required: true,
	},
	uniqueID: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	expireTime: {
		type: Date,
	},
});

const PasswordResetItem = mongoose.model('PasswordResetItem', PasswordResetItemSchema);

module.exports = PasswordResetItem;
