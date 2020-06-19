import React from 'react';
import Layout from '../layout/Layout';
import PasswordResetForm from '../store/login/PasswordResetForm';

const PasswordResetPage = (props) => {
	return (
		<Layout>
			<PasswordResetForm />
		</Layout>
	);
};

export default PasswordResetPage;
