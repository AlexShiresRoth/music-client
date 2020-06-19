import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Nav from '../nav/Nav';
import CheckoutConfirmation from '../store/checkout/CheckoutConfirmation';

const CheckoutConfirmPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<Nav />
			<CheckoutConfirmation />
		</Layout>
	);
};

export default CheckoutConfirmPage;
