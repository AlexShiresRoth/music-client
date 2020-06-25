const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const purchaseItem = require('../models/purchaseItem');
const PasswordResetItem = require('../models/passwordReset');
const api_key = process.env.MG_API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const { v4: uuidv4 } = require('uuid');

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
				res.status(400).json({ msg: 'A user with that email already exists' });
			}

			if (password2 !== password) {
				return res.status(400).json({ msg: 'Passwords do not match' });
			}

			const userFields = {};

			if (adminCode === process.env.ADMIN_CODE) userFields.role = 'admin';
			if (!adminCode) userFields.role = 'buyer';
			if (email) userFields.email = email;
			if (name) userFields.name = name;
			if (password) userFields.password = password;

			const user = new User(userFields);

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600000 }, (err, token) => {
				if (err) throw err;

				return res.json({ token });
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);

//@route GET route
//@desc Get user's order history
//@access private
router.get('/orders', auth, async (req, res) => {
	const foundOrders = await purchaseItem.find({ user: req.user.id });
	const user = await User.findById(req.user.id);

	if (foundOrders.length <= 0) {
		return res.status(400).json({ msg: 'Could not retrieve your order history' });
	}

	try {
		user.orders = foundOrders.filter((order) => order.purchased === true);

		//only return paid orders
		const paidOrders = foundOrders.filter((order) => order.purchased === true);
		console.log(paidOrders);

		res.json(paidOrders);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Errror' });
	}
});

//@route PUT route
//@desc change user password
//@access private
router.put(
	'/changepassword',
	auth,
	[
		check('passwordOne', 'Please enter your current password').not().isEmpty(),
		check('passwordTwo', 'Password must be atleast 6 characters long').isLength({ min: 6 }),
		check('passwordTwo', 'Please enter a new password').not().isEmpty(),
		check('passwordThree', 'Please confirm your new password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { passwordOne, passwordTwo, passwordThree } = req.body;

		if (passwordOne === passwordTwo) {
			return res.status(400).json({ msg: 'New password cannot be your current password' });
		}

		if (passwordTwo !== passwordThree) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}

		const foundUser = await User.findById(req.user.id);

		if (!foundUser) {
			return res.status(400).json({ msg: 'Could not find a current user' });
		}

		const match = await bcrypt.compare(passwordOne, foundUser.password);

		if (!match) {
			return res.status(400).json({ msg: 'Current password is incorrect' });
		}

		try {
			const salt = await bcrypt.genSalt(10);
			foundUser.password = await bcrypt.hash(passwordTwo, salt);
			await foundUser.save();
			res.json({ msg: 'Password Updated!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);

//@route POST route
//@desc forgot user password
//@access private
router.post(
	'/resetpassword',
	[
		check('email', 'Please enter your current email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email } = req.body;

		const foundUser = await User.findOne({ email });

		const foundPasswordReset = await PasswordResetItem.findOne({ email });

		if (!foundUser) {
			return res.status(400).json({ msg: 'Could not find a user with that email' });
		}

		if (foundPasswordReset) {
			//TODO maybe just invalidate and remove that one upon request
			await foundPasswordReset.remove();
			return res
				.status(400)
				.json({ msg: 'A password reset has already been requested, please try again in a couple minutes' });
		}

		const newPasswordObject = new PasswordResetItem({
			email,
			user: foundUser.id,
			uniqueID: null,
		});

		try {
			const payload = {
				user: {
					id: foundUser.id,
				},
			};

			//need to pass the jwt as an object id to handle expiration
			//not positive if this is the best solution or not yet, but it works
			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10min' }, async (err, token) => {
				if (err) throw err;

				//set token as id
				newPasswordObject.uniqueID = token;

				await newPasswordObject.save();

				//need to pass email dat within the jwt sign inorder to pass the token as params

				const data = {
					from: 'alex@fillthevoid.io',
					to: foundUser.email,
					subject: 'Password Reset',
					html: `<div>
					<p>Click the button to reset your password.</p>
					<a href="https://gerrymckeveny.netlify.app/#/store/passwordreset/${token}"><button>Reset Password</button></a>
					</div>`,
				};

				await mailgun.messages().send(data, (error, body) => {
					if (error) {
						console.log(error);
						return res
							.status(400)
							.json({ msg: 'Something went wrong sending the confirmation email, please try again' });
					}
					console.log(body);
					res.json({
						msg:
							'A link has been sent to this email, you have 10 minutes to reset your password or the link will expire!',
					});
				});
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);

//@route get route
//@desc load the reset password object
//@access private
router.get('/passwordreset/:id', async (req, res) => {
	const foundObject = await PasswordResetItem.findOne({ uniqueID: req.params.id });
	console.log(foundObject);
	if (!foundObject) {
		console.log('no found password reset object!');
		return res.status(400).json({ msg: 'This link is either expired or is invalid' });
	}
	const currentTime = new Date();
	//get the token from the params id
	jwt.verify(req.params.id, process.env.JWT_SECRET, async function (err, decoded) {
		// err
		if (err) {
			await foundObject.remove();
			return res.status(400).json({ msg: err.message });
		}
		//verify if token is expired or not
		console.log('decoded: ', decoded.exp, currentTime.getTime() / 1000);
		if (decoded.exp <= currentTime.getTime() / 1000) {
			await foundObject.remove();
			return res.status(400).json({ msg: 'Token has expired, please retry requesting a new link' });
		}
	});
	try {
		res.json(foundObject);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Errror' });
	}
});

//@route put route
//@desc reset password
//@access private
router.put(
	'/resetforgottenpassword',
	[
		check('email', 'Please enter your current email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('newPassword', 'Please enter a valid password').not().isEmpty(),
		check('passwordConfirm', 'Please confirm your new password').not().isEmpty(),
		check('newPassword', 'Please make sure your new password is atleast 6 characters long').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, newPassword, passwordConfirm, id } = req.body;

		const foundUser = await User.findOne({ email });

		const foundPasswordObject = await PasswordResetItem.findOne({ uniqueID: id });

		if (!foundUser) {
			return res.status(400).json({ msg: 'Could not locate an account with that email' });
		}

		if (newPassword !== passwordConfirm) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}

		//before user resets, make sure token has not expired
		jwt.verify(foundPasswordObject.uniqueID, process.env.JWT_SECRET, async function (err, decoded) {
			// err
			if (err) {
				await foundPasswordObject.remove();
				return res.status(400).json({ msg: err.message });
			}
			//verify if token is expired or not
			console.log('decoded: ', decoded.exp, currentTime.getTime() / 1000);
			if (decoded.exp <= currentTime.getTime() / 1000) {
				await foundPasswordObject.remove();
				return res.status(400).json({ msg: 'Token has expired, please retry requesting a new link' });
			}
		});

		if (!foundPasswordObject) {
			return res
				.status(400)
				.json({ msg: 'Password reset has expired or is invalid, please request another link' });
		}

		const salt = await bcrypt.genSalt(10);
		foundUser.password = await bcrypt.hash(newPassword, salt);

		try {
			await foundUser.save();
			await foundPasswordObject.remove();

			res.json({ msg: 'Password has been reset!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);

//@route PUT route
//@desc change user password
//@access private
router.put(
	'/changeemail',
	auth,
	[
		check('email', 'Please enter your current email').not().isEmpty(),
		check('newEmail', 'Email must be valid').isEmail(),
		check('newEmail', 'Please enter a new email').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, newEmail } = req.body;

		const foundUser = await User.findById(req.user.id);

		const usedEmail = await User.findOne({ email: newEmail });

		if (usedEmail) {
			return res.status(400).json({ msg: 'An account with that email already exists' });
		}

		if (email === newEmail || newEmail === foundUser.email) {
			return res.status(400).json({ msg: 'New email cannot be your current email' });
		}

		if (!foundUser) {
			return res.status(400).json({ msg: 'Could not find a current user' });
		}

		try {
			foundUser.email = newEmail;
			await foundUser.save();
			res.json({ msg: 'Email Updated!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);

//@route PUT route
//@desc delete user account
//@access private
router.put(
	'/deleteaccount',
	auth,
	[
		check('email', 'Please enter your current email').not().isEmpty(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		console.log(req.body);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const foundUser = await User.findById(req.user.id);

		const { email, password } = req.body;

		if (email !== foundUser.email) {
			return res.status(400).json({ msg: 'Email does not belong to this account' });
		}

		const match = await bcrypt.compare(password, foundUser.password);

		if (!match) {
			return res.status(400).json({ msg: 'Password does not match' });
		}

		try {
			await foundUser.remove();

			res.json({ msg: 'Account removed!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Errror' });
		}
	}
);
module.exports = router;
