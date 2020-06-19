import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../loader/LoadingSpinner';
import style from './DeleteAccount.module.scss';
import { deleteAccount } from '../../actions/account';
import { withRouter } from 'react-router-dom';

const DeleteAccount = ({ account: { errors }, history, deleteAccount }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [loading, setLoading] = useState(false);

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(formData);
		deleteAccount(formData, history);
	};

	//handle loading if errors occurr
	useEffect(() => {
		if (errors !== null) {
			setLoading(false);
		}
	}, [setLoading, errors]);

	return (
		<form className={style.form}>
			<h4>Please enter your login info to confirm deleting your account</h4>
			<div className={style.input_col}>
				<label>Current Email</label>
				<input
					type="email"
					name="email"
					placeholder="current password"
					onChange={(e) => onChange(e)}
					value={email}
					required={true}
				/>
			</div>
			<div className={style.input_col}>
				<label>Current Password</label>
				<input
					type="password"
					name="password"
					placeholder="current password"
					onChange={(e) => onChange(e)}
					value={password}
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

DeleteAccount.propTypes = {
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		account: state.account,
	};
};

export default connect(mapStateToProps, { deleteAccount })(withRouter(DeleteAccount));
