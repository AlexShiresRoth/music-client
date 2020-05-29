import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';
export const AuthorizedLinks = ({ logoutUser, history }) => {
	const links = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/logout', title: 'logout', type: 'button' },
	];

	return links.map((link) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link}>
				{link.title}
			</NavLink>
		) : (
			<button onClick={() => logoutUser(history)} className={style.link}>
				{link.title}
			</button>
		);
	});
};
