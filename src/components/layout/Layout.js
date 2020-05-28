import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Alert from '../alerts/Alert';

const Layout = ({ children }) => {
	const layoutStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<main style={{ ...layoutStyle }}>
			<Alert />
			<Nav />
			{children}
			<Footer />
		</main>
	);
};

Layout.propTypes = {};

export default Layout;
