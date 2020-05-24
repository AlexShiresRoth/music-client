import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import ItemUpload from '../store/additems/ItemUpload';

const StoreUpload = (props) => {
	return (
		<Layout>
			<ItemUpload />
		</Layout>
	);
};

export default StoreUpload;
