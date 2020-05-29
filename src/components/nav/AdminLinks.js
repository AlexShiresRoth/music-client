import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AdminLinks = ({ logoutUser, history }) => {
	const adminLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/logout', title: 'logout', type: 'button' },
		{ url: '/store/additem', title: 'upload', type: 'link' },
	];
	return adminLinks.map((link) => {
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
