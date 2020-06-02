import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import Nav from '../nav/Nav';
import Checkout from '../store/checkout/Checkout';

const CheckoutPage = (props) => {
	return (
		<Layout>
			<Nav />
			<Checkout />
		</Layout>
	);
};

CheckoutPage.propTypes = {};

export default CheckoutPage;
