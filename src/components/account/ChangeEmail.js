import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loader/LoadingSpinner';
import { changeEmail } from '../../actions/account';
import style from './ChangeEmail.module.scss';
import { connect } from 'react-redux';

const ChangeEmail = ({ changeEmail, setFormState, isFormShown, account: { emailUpdate, errors } }) => {
	const [formData, setFormData] = useState({
		email: '',
		newEmail: '',
	});

	const [loading, setLoading] = useState(false);

	const { email, newEmail } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(formData);
		changeEmail(formData);
	};

	useEffect(() => {
		if (emailUpdate) {
			setLoading(false);
			setFormState({ ...isFormShown, email: false });
		}
	}, [setLoading, emailUpdate, setFormState, isFormShown]);

	//handle loading if errors occurr
	useEffect(() => {
		if (errors !== null) {
			setLoading(false);
		}
	}, [setLoading, errors]);

	return (
		<form className={style.form}>
			<h4>Please enter your current email and then the email you wish to change to</h4>
			<div className={style.input_col}>
				<label>Current Email</label>
				<input
					type="email"
					name="email"
					placeholder="enter current email"
					onChange={(e) => onChange(e)}
					value={email}
					required={true}
				/>
			</div>
			<div className={style.input_col}>
				<label>New Email</label>
				<input
					type="email"
					name="newEmail"
					placeholder="enter new email"
					onChange={(e) => onChange(e)}
					value={newEmail}
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

ChangeEmail.propTypes = {
	changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		account: state.account,
	};
};

export default connect(mapStateToProps, { changeEmail })(ChangeEmail);
