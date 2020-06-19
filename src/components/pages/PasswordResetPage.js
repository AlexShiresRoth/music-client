import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import PasswordResetForm from '../store/login/PasswordResetForm';

const PasswordResetPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<PasswordResetForm />
		</Layout>
	);
};

export default PasswordResetPage;
