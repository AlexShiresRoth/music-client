import React from 'react';
import PropTypes from 'prop-types';
import ViewOrders from '../account/ViewOrders';
import Layout from '../layout/Layout';

const ViewOrdersPage = (props) => {
	return (
		<Layout>
			<ViewOrders />
		</Layout>
	);
};

ViewOrdersPage.propTypes = {};

export default ViewOrdersPage;
