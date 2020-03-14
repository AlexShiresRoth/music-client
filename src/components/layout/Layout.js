import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';

const Layout = ({ children }) => {
	return (
		<main>
			<Nav />
			<div>{children}</div>
		</main>
	);
};

Layout.propTypes = {};

export default Layout;
