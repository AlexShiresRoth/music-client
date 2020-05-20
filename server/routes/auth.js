const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
//@route POST ROUTE
//@desc login user
//@access private access
router.post(
	'/',
	[
		check('email', 'Could not find a user with that email').isEmail(),
		check('password', 'Password is not valid').exists(),
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: [{ msg: errors.array() }] });
		}

		const { email, password } = req.body;

		try {
			const foundUser = await User.findOne({ email });

			if (!foundUser) {
				return res.status(400).json({ errors: [{ msg: 'Could not find a user with that email' }] });
			}

			const match = await bcrypt.compare(password, foundUser.password);

			if (!match) {
				return res.status(400).json({ errors: [{ msg: 'Password is invalid' }] });
			}

			const payload = {
				user: {
					id: foundUser.id,
				},
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				console.log(foundUser);
				return res.json({ token });
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);
