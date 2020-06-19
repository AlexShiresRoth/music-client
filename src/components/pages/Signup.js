import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import SignupForm from '../store/login/SignupForm';

const Signup = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<SignupForm />
		</Layout>
	);
};

export default Signup;
