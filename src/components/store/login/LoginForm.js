import React, { useState } from 'react';
import Auth from './Auth';
import style from './LoginForm.module.scss';
import { authenticateUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

const LoginForm = ({ history, authenticateUser, auth: { isAuthenticated } }) => {
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

	if (isAuthenticated) {
		return <Redirect to="/store" />;
	}

	return (
		<Auth>
			<div className={style.container}>
				<div className={style.grunge_overlay}></div>
				<div className={style.heading}>
					<h2>Login</h2>
				</div>

				<form className={style.form} onSubmit={(e) => formSubmit(e)}>
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
						<label>Please enter your password.</label>
						<input
							type="password"
							placeholder="enter your password"
							value={password}
							name="password"
							onChange={(e) => onChange(e)}
							required={true}
						/>
					</div>

					<div className={style.input_row}>
						<Link to="/store/forgotpassword">Forgot Password?</Link>
						<button onClick={(e) => formSubmit(e)}>Login</button>
					</div>
				</form>
			</div>
		</Auth>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { authenticateUser })(withRouter(LoginForm));
