import React from 'react';
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

export default CheckoutConfirmPage;
