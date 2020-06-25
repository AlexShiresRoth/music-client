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
//@desc create cloudinary upload presets
//@access private
router.post('/uploadpresets', async (req, res) => {
	cloudinary.v2.api.create_upload_preset(
		{
			name: 'store_upload_max',
			unsigned: true,
			tags: 'remote',
			allowed_formats: 'jpg,png',
			maxFiles: 1,
		},
		function (error, result) {
			if (error) {
				console.log(error);
				return error;
			} else {
				console.log(result);
				return result;
			}
		}
	);
});

//@route POST ROUTE
//@desc create a store item
//@access private
router.post(
	'/additem',
	auth,
	[
		check('name', 'Please name the item').not().isEmpty(),
		check('amount', 'Please enter an amount for this item').not().isEmpty(),
		check('quantity', 'Please add how many items are in stock').not().isEmpty(),
		check('description', 'Please add a description for the item').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(400).json({ errors: errors.array() });
		}
		console.log(req.body);
		const { amount, quantity, description, name, image } = req.body;

		const user = await User.findById(req.user.id);

		if (user.role !== 'admin') {
			return res.status(400).json({ msg: 'You are not authorized to do this.' });
		}

		const imgResult = await cloudinary.v2.uploader.upload(
			image,
			{ public_id: name, overwrite: true, folder: 'gerry-m' },
			(error, result) => {
				console.log(result, error);
				return result;
			}
		);

		const data = new StoreItem({
			amount: amount,
			quantity,
			description,
			name,
			image,
			total: amount,
		});

		if (data.amount.includes('.')) {
			data.amount = data.amount.split('.').slice(0, 1) + '.00';
		}
		try {
			console.log('image:' + imgResult);

			await data.save();

			res.json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
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
			return res.status(404).json({ msg: 'Hmm could not find any store items' });
		}

		const sortedItems = items.sort((a, b) => a.uploadDate - b.uploadDate);

		res.json(sortedItems);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET Route
//@desc Get Edit store item
//@access private
router.get('/edit/:id', auth, async (req, res) => {
	const foundItem = await StoreItem.findById(req.params.id);

	if (!foundItem) {
		return res.status(400).json({ msg: 'Could not locate the item.' });
	}
	try {
		res.json(foundItem);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route PUT Route
//@desc Edit store item
//@access private
router.put(
	'/edititem',
	auth,
	[
		check('name', 'Please name the item').not().isEmpty(),
		check('amount', 'Please enter an amount for this item').not().isEmpty(),
		check('quantity', 'Please add how many items are in stock').not().isEmpty(),
		check('description', 'Please add a description for the item').not().isEmpty(),
	],
	async (req, res) => {
		const { amount, quantity, description, name, image, id } = req.body;

		const foundItem = await StoreItem.findById(id);
		if (!foundItem) {
			return res.status(400).json({ msg: 'Could not locate the item.' });
		}

		if (amount) {
			if (amount.includes('.')) {
				foundItem.amount = amount.split('.').slice(0, 1) + '.00';
			} else {
				foundItem.amount = amount + '.00';
			}
		}
		if (quantity) foundItem.quantity = quantity;
		if (description) foundItem.description = description;
		if (name) foundItem.name = name;
		if (image) foundItem.image = image;
		if (amount) foundItem.total = amount;
		try {
			await foundItem.save();
			res.json(foundItem);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

module.exports = router;
