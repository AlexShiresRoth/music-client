import React from 'react';
import PropTypes from 'prop-types';
import landingStyle from './Landing.module.scss';
import Layout from '../layout/Layout';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
const Landing = _ => {
	return (
		<Layout>
			<header className={landingStyle.landing}>
				<div className={landingStyle.overlay}></div>
				<div className={landingStyle.text_box}></div>
			</header>
		</Layout>
	);
};

Landing.propTypes = {};

export default Landing;
