import React, { useEffect } from 'react';
import ViewOrders from '../account/ViewOrders';
import Layout from '../layout/Layout';

const ViewOrdersPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<ViewOrders />
		</Layout>
	);
};

export default ViewOrdersPage;
