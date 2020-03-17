import React, { useState } from 'react';
import PropTypes from 'prop-types';
import landingStyle from './Landing.module.scss';
import Layout from '../layout/Layout';
import ContactModal from '../contact/ContactModal';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
const Landing = _ => {
	const [modalState, setModalState] = useState(false);

	return (
		<Layout>
			<header className={landingStyle.landing}>
				<div className={landingStyle.overlay}></div>
				<div className={landingStyle.grid}>
					<button>Gigs</button>
					<button onClick={e => setModalState(true)}>Contact</button>
					<div className={landingStyle.social}>
						<TiSocialFacebook />
						<TiSocialInstagram />
						<TiSocialTwitter />
						<FaSpotify />
					</div>
				</div>
			</header>
			<ContactModal modalState={modalState} setModalState={setModalState} />
		</Layout>
	);
};

Landing.propTypes = {};

export default Landing;
