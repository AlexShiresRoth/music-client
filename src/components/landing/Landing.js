import React from 'react';
import PropTypes from 'prop-types';
import landingStyle from './Landing.module.scss';
import Layout from '../layout/Layout';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
const Landing = _ => {
	return (
		<Layout>
			<header className={landingStyle.landing}>
				<div className={landingStyle.overlay}></div>
				<div className={landingStyle.grid}>
					<button>Gigs</button>
					<button>Contact</button>
					<div className={landingStyle.social}>
						<TiSocialFacebook />
						<TiSocialInstagram />
						<TiSocialTwitter />
						<FaSpotify />
					</div>
				</div>
			</header>
		</Layout>
	);
};

Landing.propTypes = {};

export default Landing;
