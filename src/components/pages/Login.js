import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import LoginForm from '../store/login/LoginForm';

const Login = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<LoginForm />
		</Layout>
	);
};

export default Login;
