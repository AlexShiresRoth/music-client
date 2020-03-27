import React, { useState, useEffect, useRef } from 'react';
import landingStyle from './Landing.module.scss';
import ContactModal from '../contact/ContactModal';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
import { addRef, setActive } from '../../actions/refs';
import { connect } from 'react-redux';

const Landing = ({ setActive, addRef }) => {
	const [modalState, setModalState] = useState(false);

	const headerRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.intersectionRatio <= 5) {
					console.log('not intersecting');
					setActive(true);
				}
				if (entry.isIntersecting) {
					console.log('intersecting');
					setActive(false);
					//add redux to handle state
				}
			},
			{ rootMargin: '0px 0px 00px 0px', threshold: 0.5 }
		);
		if (headerRef.current) {
			observer.observe(headerRef.current);
		}
		addRef(headerRef);
	}, [setActive, addRef]);
	return (
		<>
			<header className={landingStyle.landing} ref={headerRef} id="landing">
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

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef, setActive })(Landing);
