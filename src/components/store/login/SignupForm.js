import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Signup.module.scss';
import Auth from './Auth';
import { createUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SignupForm = ({ setForm, history, createUser }) => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		adminCode: '',
	});

	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

	const { name, email, password, password2, adminCode } = data;

	const formSubmit = (e) => {
		e.preventDefault();
		createUser(data, history);
	};

	return (
		<Auth>
			<div className={style.container}>
				<div className={style.grunge_overlay}></div>

				<div className={style.heading}>
					<h2>
						Create an account to access the history of your purchases. If you already have an account,
						please
						<button onClick={() => setForm({ type: 'login' })}>login.</button>
					</h2>
				</div>
				<form className={style.form}>
					<div className={style.input_col}>
						<label>Please enter your name.</label>
						<input
							type="text"
							placeholder="enter your name"
							value={name}
							name="name"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Please enter your email.</label>
						<input
							type="email"
							placeholder="enter your email"
							value={email}
							name="email"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Please create a password.</label>
						<input
							type="password"
							placeholder="create a password"
							value={password}
							name="password"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Please confirm your password.</label>
						<input
							type="password"
							placeholder="reenter your password"
							value={password2}
							name="password2"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>If you have an admin code, please enter it.</label>
						<input
							type="password"
							placeholder="enter admin code"
							value={adminCode}
							name="adminCode"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<button onClick={(e) => formSubmit(e)}>Create Account</button>
					</div>
				</form>
			</div>
		</Auth>
	);
};

SignupForm.propTypes = {
	setForm: PropTypes.func.isRequired,
	createUser: PropTypes.func.isRequired,
};

export default connect(null, { createUser })(withRouter(SignupForm));
