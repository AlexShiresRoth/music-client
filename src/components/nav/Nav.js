import React from 'react';
import PropTypes from 'prop-types';
import navStyle from './Nav.module.scss';

const Nav = () => {
	const navLinks = ['gigs', 'music', 'bio', 'store', 'contact'].map((link, i) => {
		return <a key={i}>{link}</a>;
	});
	return (
		<nav className={navStyle.nav}>
			<div className={navStyle.nav_title}>
				<h2>Gerry Mckeveny</h2>
			</div>
			<div className={navStyle.nav_inner}>{navLinks}</div>
		</nav>
	);
};

Nav.propTypes = {};

export default Nav;
