import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './LoginForm.module.scss';
import { authenticateUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const LoginForm = ({ setForm, history, authenticateUser }) => {
	console.log(history);
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

	const { email, password } = data;

	const formSubmit = (e) => {
		e.preventDefault();
		authenticateUser(data, history);
	};

	return (
		<form className={style.form} onSubmit={(e) => formSubmit(e)}>
			<div className={style.heading}>
				<h2>
					Please Login or
					<a onClick={() => setForm({ type: 'signup' })}>Sign Up</a>
				</h2>
			</div>
			<div className={style.grid}>
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
					<button onClick={(e) => formSubmit(e)}>Login</button>
				</div>
			</div>
		</form>
	);
};

LoginForm.propTypes = {};

export default connect(null, { authenticateUser })(withRouter(LoginForm));
