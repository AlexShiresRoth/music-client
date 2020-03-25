import React, { useState, useEffect, useRef } from 'react';
import landingStyle from './Landing.module.scss';
import ContactModal from '../contact/ContactModal';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
const Landing = _ => {
	const [modalState, setModalState] = useState(false);

	const headerRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				console.log(entry);
				if (entry.intersectionRatio <= 5) {
					console.log('not intersecting');
				}
				if (entry.isIntersecting) {
					console.log('intersecting');
					//add redux to handle state
				}
			},
			{ rootMargin: '0px 0px 00px 0px', threshold: 0.5 }
		);
		if (headerRef.current) {
			observer.observe(headerRef.current);
		}
	}, []);
	return (
		<>
			<header className={landingStyle.landing} ref={headerRef}>
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
		</>
	);
};

export default Landing;
