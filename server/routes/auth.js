const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
//@route GET ROUTE
//@desc get user
//@access private access
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		console.log('this is the user', user);
		if (!user) {
			console.log('could not load user');
			return res.status(400).json({ msg: 'Could not load user' });
		}

		return res.json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST ROUTE
//@desc login user
//@access private access
router.post(
	'/',
	[
		check('email', 'Could not find a user with that email').isEmail(),
		check('password', 'Password is not valid').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const foundUser = await User.findOne({ email });

			if (!foundUser) {
				return res.status(400).json({ msg: 'Could not find a user with that email' });
			}

			const match = await bcrypt.compare(password, foundUser.password);

			if (!match) {
				return res.status(400).json({ msg: 'Password is invalid' });
			}

			const payload = {
				user: {
					id: foundUser.id,
				},
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600000 }, (err, token) => {
				if (err) throw err;
				console.log('success');
				return res.json({ token });
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

//@route POST ROUTE
//@desc logout user
router.post('/logout', async (req, res) => {
	const foundUser = await User.findOne({ email: req.user.email });

	if (!foundUser) {
		return res.status(400).json({ errors: [{ msg: ' You must be logged in to do that' }] });
	}

	try {
		return res.json({ msg: 'You have been logged out' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
