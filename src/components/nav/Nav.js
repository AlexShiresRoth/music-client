import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import navStyle from './Nav.module.scss';
import { connect } from 'react-redux';

const Nav = ({ refs: { active, refs, currentSection } }) => {
	const navLinks = [
		{ url: '/', title: 'home', type: 'button' },
		{ url: '/gigs', title: 'gigs', type: 'button' },
		{ url: '/music', title: 'music', type: 'link' },
		{ url: '/bio', title: 'bio', type: 'button' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/contact', title: 'contact', type: 'link' },
	].map((link, i) => {
		return link.type === 'link' ? (
			<NavLink exact to={link.url} key={i} activeClassName={navStyle.active} className={navStyle.link}>
				{link.title}
			</NavLink>
		) : (
			<a
				className={currentSection === link.title ? `${navStyle.link} ${navStyle.active} ` : `${navStyle.link}`}
				onClick={() =>
					scrollToSection(refs.filter(ref => ref.current !== null && ref.current.id === link.title))
				}
			>
				{link.title}
			</a>
		);
	});

	const scrollToSection = refs => {
		const selectedSection = refs[0];

		const handleScroll = ref => {
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
			default:
				return;
		}
	};

	return (
		<nav className={active ? `${navStyle.nav} ${navStyle.active_nav}` : `${navStyle.nav}`}>
			<div className={navStyle.nav_title}>
				<h2>Gerry Mckeveny</h2>
			</div>
			<div className={navStyle.nav_inner}>{navLinks}</div>
		</nav>
	);
};

Nav.propTypes = {
	refs: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, null)(Nav);
