import React from 'react';
import PropTypes from 'prop-types';
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
				<a href="https://www.alexrothproductions.com/" target="_blank" rel="noopener noreferrer">
					powered by alexrothproductions.com
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

Footer.propTypes = {};

export default Footer;
