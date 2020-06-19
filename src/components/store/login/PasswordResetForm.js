import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import style from './PasswordResetForm.module.scss';
import { LoadingSpinner } from '../../loader/LoadingSpinner';
import { loadPasswordResetObject, sendPasswordResetRequest } from '../../../actions/account';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const PasswordResetForm = ({
	history,
	match,
	loadPasswordResetObject,
	sendPasswordResetRequest,
	account: { loading, passwordObject },
}) => {
	useEffect(() => {
		loadPasswordResetObject(match.params.id);
	}, [loadPasswordResetObject, match.params.id]);

	const [formData, setFormData] = useState({
		email: '',
		newPassword: '',
		passwordConfirm: '',
		id: match.params.id,
	});

	const { email, newPassword, passwordConfirm } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();

		sendPasswordResetRequest(formData, history);
	};

	console.log(passwordObject);
	return !loading ? (
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
					<div className={style.input_col}>
						<label>Please enter your desired new password.</label>
						<input
							type="password"
							placeholder="enter your new password"
							value={newPassword}
							name="newPassword"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>

					<div className={style.input_col}>
						<label>Please confirm your new password.</label>
						<input
							type="password"
							placeholder="enter your new password"
							value={passwordConfirm}
							name="passwordConfirm"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>

					<div className={style.input_row}>
						<button onClick={(e) => formSubmit(e)} disabled={passwordObject === null}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</Auth>
	) : (
		<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<LoadingSpinner />
		</div>
	);
};

PasswordResetForm.propTypes = {
	loadPasswordResetObject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		account: state.account,
	};
};

export default connect(mapStateToProps, { loadPasswordResetObject, sendPasswordResetRequest })(
	withRouter(PasswordResetForm)
);
