import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Nav from '../nav/Nav';
import Checkout from '../store/checkout/Checkout';

const CheckoutPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<Nav />
			<Checkout />
		</Layout>
	);
};

export default CheckoutPage;
