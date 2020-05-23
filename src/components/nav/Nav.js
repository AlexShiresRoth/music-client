import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import navStyle from './Nav.module.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { setActive } from '../../actions/refs';

const Nav = ({ refs: { active, refs, currentSection }, setActive, history, auth: { isAuthenticated }, logoutUser }) => {
	const [page, setPage] = useState('');

	const navLinks = [
		{ url: '/', title: 'home', type: 'button' },
		{ url: '/gigs', title: 'gigs', type: 'button' },
		{ url: '/music', title: 'music', type: 'button' },
		{ url: '/bio', title: 'bio', type: 'button' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/contact', title: 'contact', type: 'link' },
	];

	const authLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/login', title: 'signup/login', type: 'link' },
		{ url: '/store', title: 'cart', type: 'button' },
	];

	const authLinksAuthorized = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/logout', title: 'logout', type: 'button' },
		{ url: '/store', title: 'cart', type: 'button' },
	];

	//todo DRY this up
	const handleNavLinks = (links) => {
		return links.map((link, i) => {
			return history.location.pathname.includes('store') ? (
				link.type === 'link' ? (
					<NavLink exact to={link.url} key={i} activeClassName={navStyle.active} className={navStyle.link}>
						{link.title}
					</NavLink>
				) : link.title === 'logout' ? (
					<button
						className={
							currentSection === link.title ? `${navStyle.link} ${navStyle.active} ` : `${navStyle.link}`
						}
						onClick={() => logoutUser()}
					>
						{link.title}
					</button>
				) : (
					<NavLink to={`/#${link.title}`} className={navStyle.link}>
						{link.title}
					</NavLink>
				)
			) : link.type === 'link' ? (
				<NavLink exact to={link.url} key={i} activeClassName={navStyle.active} className={navStyle.link}>
					{link.title}
				</NavLink>
			) : (
				<button
					className={
						currentSection === link.title ? `${navStyle.link} ${navStyle.active} ` : `${navStyle.link}`
					}
					onClick={() => {
						scrollToSection(refs.filter((ref) => ref.current !== null && ref.current.id === link.title));
					}}
				>
					{link.title}
				</button>
			);
		});
	};

	const scrollToSection = (refs) => {
		const selectedSection = refs[0];

		const handleScroll = (ref) => {
			window.scrollTo({
				top: ref.current.offsetTop,
				left: 0,
				behavior: 'smooth',
			});
		};

		switch (true) {
			case selectedSection.current.id === 'bio':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'home':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'gigs':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'music':
				handleScroll(selectedSection);
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		setPage(history.location.pathname);
		setActive(history.location.pathname !== '/');
	}, [history.location.pathname, setActive]);

	return (
		<nav className={active ? `${navStyle.nav} ${navStyle.active_nav}` : `${navStyle.nav}`}>
			<div className={navStyle.nav_title}>
				<h2>Gerry Mckeveny</h2>
			</div>
			<div className={navStyle.nav_inner}>
				{page !== '/'
					? isAuthenticated
						? handleNavLinks(authLinksAuthorized)
						: handleNavLinks(authLinks)
					: handleNavLinks(navLinks)}
			</div>
		</nav>
	);
};

Nav.propTypes = {
	refs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { logoutUser, setActive })(withRouter(Nav));
