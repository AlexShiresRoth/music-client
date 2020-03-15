import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import navStyle from './Nav.module.scss';

const Nav = () => {
	const navLinks = ['home', 'gigs', 'music', 'bio', 'store', 'contact'].map((link, i) => {
		return (
			<NavLink exact to={'/' + link} key={i} activeClassName={navStyle.active} className={navStyle.link}>
				{link}
			</NavLink>
		);
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
