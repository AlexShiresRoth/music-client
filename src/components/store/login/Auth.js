import React from 'react';
import style from './Auth.module.scss';

const Auth = ({ children }) => {
	return <section className={style.auth_container}>{children}</section>;
};

export default Auth;
