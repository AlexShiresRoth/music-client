import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Auth.module.scss';
import Signup from './Signup';
import LoginForm from './LoginForm';

const Auth = (props) => {
	const [form, setForm] = useState({
		type: 'signup',
	});

	const { type } = form;

	return (
		<section className={style.auth_container}>
			{type === 'signup' ? <Signup setForm={setForm} /> : <LoginForm setForm={setForm} />}
		</section>
	);
};

Auth.propTypes = {};

export default Auth;
