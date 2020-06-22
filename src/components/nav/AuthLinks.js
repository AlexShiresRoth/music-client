import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AuthLinks = () => {
	const authLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/signup', title: 'signup', type: 'link' },
		{ url: '/store/login', title: 'login', type: 'link' },
		{ url: '/contact', title: 'contact', type: 'link' },
	];
	return authLinks.map((link, i) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link} key={i}>
				{link.title}
			</NavLink>
		) : (
			<button key={i}>{link.title}</button>
		);
	});
};
