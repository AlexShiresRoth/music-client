import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import LoginForm from '../store/login/LoginForm';

const Login = (props) => {
	return (
		<Layout>
			<LoginForm />
		</Layout>
	);
};

Login.propTypes = {};

export default Login;
