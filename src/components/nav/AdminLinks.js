import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AdminLinks = ({ logoutUser, history, cancelIntent, purchaseItem }) => {
	const adminLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/logout', title: 'logout', type: 'button' },
		{ url: '/store/account', title: 'account', type: 'link' },
		{ url: '/store/additem', title: 'upload', type: 'link' },
		{ url: '/contact', title: 'contact', type: 'link' },
	];

	const handleUserLogout = () => {
		if (purchaseItem !== null) {
			//cancel any pending purchases with stripe id
			cancelIntent(purchaseItem.payment, history);
		}

		logoutUser(history);
	};
	return adminLinks.map((link, i) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link} key={i}>
				{link.title}
			</NavLink>
		) : (
			<button onClick={() => handleUserLogout()} className={style.link} key={i}>
				{link.title}
			</button>
		);
	});
};
