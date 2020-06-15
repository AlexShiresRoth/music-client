import React from 'react';
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

export default CheckoutPage;
