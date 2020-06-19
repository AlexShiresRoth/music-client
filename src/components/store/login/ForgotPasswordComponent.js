import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import style from './ForgotPassword.module.scss';
import { connect } from 'react-redux';
import { sendPasswordResetLink } from '../../../actions/account';

const ForgotPasswordComponent = ({ sendPasswordResetLink }) => {
	const [data, setData] = useState({
		email: '',
	});

	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

	const { email } = data;

	const formSubmit = (e) => {
		e.preventDefault();

		sendPasswordResetLink(data);
	};

	return (
		<Auth>
			<div className={style.container}>
				<div className={style.grunge_overlay}></div>
				<div className={style.heading}>
					<h2>Password Reset</h2>
				</div>

				<form className={style.form} onSubmit={(e) => formSubmit(e)}>
					<div className={style.input_col}>
						<label>Please enter the email associated with the account.</label>
						<input
							type="email"
							placeholder="enter your email"
							value={email}
							name="email"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>

					<div className={style.input_row}>
						<button onClick={(e) => formSubmit(e)}>Submit</button>
					</div>
				</form>
			</div>
		</Auth>
	);
};

ForgotPasswordComponent.propTypes = {
	sendPasswordResetLink: PropTypes.func.isRequired,
};

export default connect(null, { sendPasswordResetLink })(ForgotPasswordComponent);
