import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.scss';

export const AuthLinks = ({ setModalState, modalState }) => {
	const authLinks = [
		{ url: '/', title: 'home', type: 'link' },
		{ url: '/store', title: 'store', type: 'link' },
		{ url: '/store/signup', title: 'signup', type: 'link' },
		{ url: '/store/login', title: 'login', type: 'link' },
		{ url: '', title: 'contact', type: 'button' },
	];
	return authLinks.map((link, i) => {
		return link.type !== 'button' ? (
			<NavLink exact to={link.url} activeClassName={style.active} className={style.link} key={i}>
				{link.title}
			</NavLink>
		) : link.title !== 'contact' ? (
			<button key={i}>{link.title}</button>
		) : (
			<button className={style.link} onClick={(e) => setModalState(!modalState)} key={i}>
				{link.title}
			</button>
		);
	});
};
