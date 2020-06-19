import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import ItemUpload from '../store/additems/ItemUpload';

const StoreUpload = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<ItemUpload />
		</Layout>
	);
};

export default StoreUpload;
