import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Shop from '../store/Shop';

const Store = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
	return (
		<Layout>
			<Shop />
		</Layout>
	);
};

export default Store;
