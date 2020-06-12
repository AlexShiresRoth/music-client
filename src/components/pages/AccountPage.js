import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import Account from '../account/Account';

const AccountPage = (props) => {
	return (
		<Layout>
			<Account />
		</Layout>
	);
};

AccountPage.propTypes = {};

export default AccountPage;
