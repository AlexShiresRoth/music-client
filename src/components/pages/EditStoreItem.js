import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import EditItem from '../store/additems/EditItem';

const EditStoreItem = (props) => {
	return (
		<Layout>
			<EditItem />
		</Layout>
	);
};

EditStoreItem.propTypes = {};

export default EditStoreItem;
