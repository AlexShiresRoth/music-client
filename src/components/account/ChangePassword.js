import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './ChangePassword.module.scss';
import { changePassword } from '../../actions/account';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../loader/LoadingSpinner';

const ChangePassword = ({ changePassword, setFormState, isFormShown, account: { updateSuccess, errors } }) => {
	const [formData, setFormData] = useState({
		passwordOne: '',
		passwordTwo: '',
		passwordThree: '',
	});

	const [loading, setLoading] = useState(false);

	const { passwordOne, passwordTwo, passwordThree } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(formData);
		changePassword(formData);
	};

	useEffect(() => {
		if (updateSuccess) {
			setLoading(false);
			setFormState({ ...isFormShown, password: false });
		}
	}, [setLoading, updateSuccess, setFormState, isFormShown]);

	//handle loading if errors occurr
	useEffect(() => {
		if (errors !== null) {
			setLoading(false);
		}
	}, [setLoading, errors]);

	return (
		<form className={style.form}>
			<h4>Enter your current password and then your desired new password</h4>
			<div className={style.input_col}>
				<label>Current Password</label>
				<input
					type="password"
					name="passwordOne"
					placeholder="current password"
					onChange={(e) => onChange(e)}
					value={passwordOne}
					required={true}
				/>
			</div>
			<div className={style.input_col}>
				<label>New Password</label>
				<input
					type="password"
					name="passwordTwo"
					placeholder="new password"
					onChange={(e) => onChange(e)}
					value={passwordTwo}
					required={true}
				/>
			</div>
			<div className={style.input_col}>
				<label>Confirm New Password</label>
				<input
					type="password"
					name="passwordThree"
					placeholder="confirm new password"
					onChange={(e) => onChange(e)}
					value={passwordThree}
					required={true}
				/>
			</div>
			{loading ? (
				<LoadingSpinner />
			) : (
				<button onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleSubmit(e)}>
					Submit
				</button>
			)}
		</form>
	);
};

ChangePassword.propTypes = {
	changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		account: state.account,
	};
};

export default connect(mapStateToProps, { changePassword })(ChangePassword);
