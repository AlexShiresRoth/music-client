import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import Nav from '../nav/Nav';
import CheckoutConfirmation from '../store/checkout/CheckoutConfirmation';

const CheckoutConfirmPage = (props) => {
	return (
		<Layout>
			<Nav />
			<CheckoutConfirmation />
		</Layout>
	);
};

CheckoutConfirmPage.propTypes = {};

export default CheckoutConfirmPage;
