import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Account from '../account/Account';

const AccountPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);

	return (
		<Layout>
			<Account />
		</Layout>
	);
};

export default AccountPage;
