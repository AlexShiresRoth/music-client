import React from 'react';
import footerStyle from './Footer.module.scss';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
	return (
		<footer className={footerStyle.footer}>
			<div className={footerStyle.col}>
				<p> gerrymckeveny.com &copy; 2020</p>
				<a href="https://fillthevoid.io" target="_blank" rel="noopener noreferrer">
					Website Design & Development by <span>fillthevoid.io</span>
				</a>
			</div>
			<div className={footerStyle.col}>
				<h3>Contact</h3>
				<Link to="/contact">Booking</Link>
				<a href="mailto:alex@fillthevoid.io">Support</a>
				<Link to="/contact">Contact Page</Link>
			</div>
			<div className={footerStyle.col}>
				<h3>Site</h3>
				<Link to="/">Home</Link>
				<Link to="/store">store</Link>
				<Link to="/store/login">login</Link>
				<Link to="/store/signup">signup</Link>
			</div>
			<div className={footerStyle.col}>
				<div className={footerStyle.social}>
					<TiSocialFacebook />
					<TiSocialInstagram />
					<TiSocialTwitter />
					<FaSpotify />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
