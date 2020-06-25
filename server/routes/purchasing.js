const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const StoreItem = require('../models/storeItem');
const purchaseItem = require('../models/purchaseItem');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const auth = require('../middleware/auth');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
//@route PUT ROUTE
//@desc Create a purchase item
//@access public
router.post(
	'/',
	auth,
	[check('email', 'Must be a valid email').isEmail(), check('name', 'Please enter your name').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { total, email, name, cart, orderId } = req.body;

		if (parseInt(total) <= 0) {
			return res.status(400).json({ msg: 'Total cannot be less than $0.00, come on now.' });
		}

		//check if user tries to purchase 0 quantity
		if (cart.filter((item) => parseInt(item.total) <= 0).length > 0) {
			console.log(cart.filter((item) => parseInt(item.total) <= 0).length > 0);
			return res.status(400).json({ msg: 'Quantity cannot be less than 0 :(' });
		}

		//check if user tries to buy more than available
		if (
			cart.filter((item) => {
				const attemptedQuantity = parseInt(item.total) / parseInt(item.amount);
				return attemptedQuantity > item.quantity;
			}).length > 0
		) {
			console.log(
				cart.filter((item) => {
					const attemptedQuantity = parseInt(item.total) / parseInt(item.amount);
					return attemptedQuantity > item.quantity;
				})
			);
			return res.status(400).json({ msg: 'Quantity cannot be more than the available quantity :(' });
		}

		const newPurchase = new purchaseItem({
			total,
			email,
			name,
			items: cart,
			user: req.user.id,
			orderId,
			purchased: false,
		});

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: parseInt(total + '00'),
				currency: 'usd',
				// Verify your integration in this guide by including this parameter
				metadata: { integration_check: 'accept_a_payment' },
				receipt_email: email,
			});
			newPurchase.payment = paymentIntent.id;
			await newPurchase.save();
			res.json(newPurchase);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

//@route GET Route
//@desc get payment intent secret
//@access private
router.get('/retrieveintent/:id', async (req, res) => {
	try {
		await stripe.paymentIntents.retrieve(req.params.id, function (err, paymentIntent) {
			if (err) {
				console.log('uh oh', err);
				return res.status(400).json({ msg: err });
			}
			if (!paymentIntent) {
				return res.status(400).json({ msg: 'Could not retieve payment intent' });
			} else {
				return res.json(paymentIntent.client_secret);
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST Route
//@desc get payment intent secret
//@access private
router.post('/cancelintent/:id', async (req, res) => {
	const foundItem = await purchaseItem.findOne({ payment: req.params.id });

	if (!foundItem) {
		return res.status(400).json({ msg: 'Could not find requested item' });
	}
	console.log('found with payment', foundItem);
	try {
		await stripe.paymentIntents.cancel(req.params.id, function (err, paymentIntent) {
			if (err) {
				console.log('uh oh', err);
				return res.status(400).json({ msg: err });
			}
			if (!paymentIntent) {
				return res.status(400).json({ msg: 'Could not cancel payment intent' });
			} else {
				foundItem.remove();
				console.log('Item was deleted', foundItem);
				return res.json(paymentIntent);
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET Route
//@desc get created purchase item
//@access private
router.get('/:id', auth, async (req, res) => {
	const foundItem = await purchaseItem.findById(req.params.id);

	if (!foundItem) {
		return res.status(400).json({ msg: 'The item could not be found.' });
	}
	try {
		console.log('found this', foundItem);

		res.json(foundItem);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route PUT Route
//@desc Edit store item
//@access private
router.put('/updatequantity', auth, async (req, res) => {
	const { quantity, id } = req.body;
	const foundItem = await StoreItem.findById(id);

	if (!foundItem) {
		return res.status(400).json({ msg: 'Could not locate the item.' });
	}

	if (quantity) foundItem.quantity = parseInt(foundItem.quantity) - quantity;

	try {
		await foundItem.save();
		console.log(quantity, foundItem);
		res.json(foundItem);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST Route
//@desc add item to user's order history
//@access private
router.post('/paymentsuccess', auth, async (req, res) => {
	console.log('payment success', req.body);

	const foundUser = await User.findById(req.user.id);

	const foundPurchase = await purchaseItem.findById(req.body._id);

	if (!foundPurchase) {
		return res.status(400).json({ msg: 'Could not update purchase item, please try again' });
	}
	//set the payment status to true
	foundPurchase.purchased = true;

	//find all previous purchases
	const foundPurchases = await purchaseItem.find({ user: req.user.id });

	if (!foundUser) {
		return res.status(400).json({ msg: 'Could not find user' });
	}

	foundUser.orders = [foundPurchase, ...foundPurchases];

	try {
		await foundPurchase.save();
		await foundUser.save();
		res.json(foundUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
