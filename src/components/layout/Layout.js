import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<div>{children}</div>
		</>
	);
};

Layout.propTypes = {};

export default Layout;
