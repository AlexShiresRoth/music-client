import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import Auth from '../store/login/Auth';

const Login = (props) => {
	return (
		<Layout>
			<Auth />
		</Layout>
	);
};

Login.propTypes = {};

export default Login;
