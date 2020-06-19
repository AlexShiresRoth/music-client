import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import ForgotPasswordComponent from '../store/login/ForgotPasswordComponent';

const ForgotPassword = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<ForgotPasswordComponent />
		</Layout>
	);
};

export default ForgotPassword;
