import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import EditItem from '../store/additems/EditItem';

const EditStoreItem = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<EditItem />
		</Layout>
	);
};

export default EditStoreItem;
