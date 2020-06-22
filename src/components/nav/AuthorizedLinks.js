import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AuthorizedLinks = ({ logoutUser, history, purchaseItem, cancelIntent }) => {
	const links = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/account', title: 'account', type: 'link' },
		{ url: '/store/logout', title: 'logout', type: 'button' },
		{ url: '/contact', title: 'contact', type: 'link' },
	];

	const handleUserLogout = () => {
		if (purchaseItem !== null) {
			//cancel any pending purchases with stripe id
			cancelIntent(purchaseItem.payment);
		}
		logoutUser(history);
	};

	return links.map((link) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link}>
				{link.title}
			</NavLink>
		) : (
			<button onClick={() => handleUserLogout()} className={style.link}>
				{link.title}
			</button>
		);
	});
};
