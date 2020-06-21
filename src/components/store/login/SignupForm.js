import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SignupForm.module.scss';
import Auth from './Auth';
import { createUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const SignupForm = ({ history, createUser, auth: { isAuthenticated } }) => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

	const { name, email, password, password2 } = data;

	const formSubmit = (e) => {
		e.preventDefault();
		createUser(data, history);
	};

	if (isAuthenticated) {
		return <Redirect to="/store" />;
	}

	return (
		<Auth>
			<div className={style.container}>
				<div className={style.grunge_overlay}></div>

				<div className={style.heading}>
					<h2>Create Account</h2>
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
					<ReCAPTCHA sitekey="6Lf9eqYZAAAAAFqLN28KOAKFCfjz138SnYM7aaH1" onChange={onChange} />
					<div className={style.btn_col}>
						<button onClick={(e) => formSubmit(e)}>Create Account</button>
					</div>
				</form>
			</div>
		</Auth>
	);
};

SignupForm.propTypes = {
	createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { createUser })(withRouter(SignupForm));
