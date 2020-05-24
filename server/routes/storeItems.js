const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const StoreItem = require('../models/storeItem');
const { check, validationResult } = require('express-validator');
const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'snackmanproductions',
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_SECRET,
});
//@route POST ROUTE
//@desc create a store item
//@access private
router.post(
	'/',
	auth,
	[
		check('amount', 'Please enter an amount for this item').not().isEmpty(),
		check('quantity', 'Please add how many items are in stock').not().isEmpty(),
		check('description', 'Please add a description for the item').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: [{ msg: errors.array() }] });
		}

		const { amount, quantity, description, name, image } = req.body;

		const user = await User.findById(req.user.id);

		if (user.role !== 'admin') {
			return res.status(400).json({ errors: [{ msg: 'You are not authorized to do this.' }] });
		}

		const imgResult = await cloudinary.v2.uploader.upload(
			image,
			{ public_id: name, overwrite: true, folder: 'gerry-m' },
			(error, result) => {
				console.log(result, error);
				return result;
			}
		);
		try {
			console.log('image:' + imgResult);
			const data = new StoreItem({
				amount,
				quantity,
				description,
				name,
				image: imgResult.secure_url,
			});

			await data.save();

			res.json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);

//@route GET ROUTE
//@desc Get store items
//@access public
router.get('/', async (req, res) => {
	const items = await StoreItem.find();

	try {
		if (!items) {
			return res.status(404).json({ errors: [{ msg: 'Hmm could not find any store items' }] });
		}

		const sortedItems = items.sort((a, b) => a.uploadDate - b.uploadDate);

		res.json(sortedItems);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});

module.exports = router;
