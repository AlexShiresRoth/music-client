const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//@route POST ROUTE
//@desc create User
router.post(
	'/',
	[
		check('name', 'Please enter your name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Password must be 6 characters or longer').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(req.body);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { adminCode, email, name, password, password2 } = req.body;

			const foundUser = await User.findOne({ email }).select('-password');

			if (foundUser) {
				return res.status(400).json({ errors: [{ msg: 'A user with that email already exists' }] });
			}

			if (password2 !== password) {
				return res.status(400).json({ errors: [{ msg: 'Passwords do not match' }] });
			}

			const userFields = {};

			if (adminCode === process.env.ADMIN_CODE) {
				userFields.role = 'admin';
			} else userFields.role = 'buyer';
			if (email) userFields.email = email;
			if (name) userFields.name = name;
			if (password) userFields.password = password;

			const user = new User(userFields);

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			console.log(user);
			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				return res.json({ token });
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ errors: [{ msg: 'Internal Server Errror' }] });
		}
	}
);

module.exports = router;
