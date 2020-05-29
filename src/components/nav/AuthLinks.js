import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AuthLinks = () => {
	const authLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/signup', title: 'signup', type: 'link' },
		{ url: '/store/login', title: 'login', type: 'link' },
	];
	return authLinks.map((link) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link}>
				{link.title}
			</NavLink>
		) : (
			<button>{link.title}</button>
		);
	});
};
