import React, { useState, useEffect, useRef } from 'react';
import landingStyle from './Landing.module.scss';
import ContactModal from '../contact/ContactModal';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
import { addRef, setActive, setCurrent } from '../../actions/refs';
import { connect } from 'react-redux';

const Landing = ({ setActive, addRef, setCurrent }) => {
	const [modalState, setModalState] = useState(false);

	const headerRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.intersectionRatio <= 5) {
					setActive(true);
				}
				if (entry.isIntersecting) {
					setActive(false);
					setCurrent('home');
					//add redux to handle state
				}
			},
			{ rootMargin: '0px 0px 00px 0px', threshold: 0.8 }
		);
		if (headerRef.current) {
			observer.observe(headerRef.current);
		}
		if (headerRef.current !== null) addRef(headerRef);
	}, [setActive, addRef, setCurrent]);

	return (
		<>
			<header className={landingStyle.landing} ref={headerRef} id="home">
				<div className={landingStyle.overlay}></div>
				<div className={landingStyle.grid}>
					<button>Store</button>
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

export default connect(mapStateToProps, { addRef, setActive, setCurrent })(Landing);
