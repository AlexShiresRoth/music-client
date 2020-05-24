import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import SignupForm from '../store/login/SignupForm';

const Signup = (props) => {
	return (
		<Layout>
			<SignupForm />
		</Layout>
	);
};

Signup.propTypes = {};

export default Signup;
