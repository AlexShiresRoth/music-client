import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
	return (
		<main>
			<Nav />
			{children}
			<Footer />
		</main>
	);
};

Layout.propTypes = {};

export default Layout;
