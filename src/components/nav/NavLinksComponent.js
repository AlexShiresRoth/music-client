import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const NavLinksComponent = ({ scrollToSection, refs, currentSection }) => {
	const links = [
		{ url: '/', title: 'home', type: 'button' },
		{ url: '/gigs', title: 'gigs', type: 'button' },
		{ url: '/music', title: 'music', type: 'button' },
		{ url: '/bio', title: 'bio', type: 'button' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/contact', title: 'contact', type: 'link' },
	];
	return links.map((link) => {
		return link.type === 'button' ? (
			<button
				onClick={() =>
					scrollToSection(refs.filter((ref) => ref.current !== null && ref.current.id === link.title))
				}
				className={currentSection === link.title ? style.active : style.link}
			>
				{link.title}
			</button>
		) : (
			<NavLink to={link.url} activeClassName={style.active} className={style.link}>
				{link.title}
			</NavLink>
		);
	});
};
