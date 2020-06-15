import React from 'react';
import footerStyle from './Footer.module.scss';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
const Footer = () => {
	return (
		<footer className={footerStyle.footer}>
			<div className={footerStyle.left}>
				<p> gerrymckeveny.com &copy; 2020</p>
			</div>
			<div className={footerStyle.center}>
				<a href="https://fillthevoid.io" target="_blank" rel="noopener noreferrer">
					Website Design & Development by <span>fillthevoid.io</span>
				</a>
			</div>
			<div className={footerStyle.right}>
				<TiSocialFacebook />
				<TiSocialInstagram />
				<TiSocialTwitter />
				<FaSpotify />
			</div>
		</footer>
	);
};

export default Footer;
