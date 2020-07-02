import React, { useEffect, useRef } from 'react';
import landingStyle from './Landing.module.scss';
import { TiSocialInstagram, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaSpotify } from 'react-icons/fa';
import { addRef, setActive, setCurrent } from '../../actions/refs';
import { setModalState } from '../../actions/contact';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IntersectionObserver from 'intersection-observer-polyfill';

const Landing = ({ setActive, addRef, setCurrent }) => {
	const headerRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setActive(false);
					setCurrent('home');
				}
				if (!entry.isIntersecting) {
					setActive(true);
				}
			},
			{ rootMargin: '-200px 0px 00px 0px', threshold: 0.6 }
		);
		if (headerRef.current) {
			observer.observe(headerRef.current);
		}
		if (headerRef.current !== null) addRef(headerRef);
	}, [setActive, addRef, setCurrent]);

	return (
		<>
			<header className={landingStyle.landing}>
				<div className={landingStyle.overlay} ref={headerRef} id="home"></div>
				<div className={landingStyle.grid}>
					<Link to="/store">
						<button>Store</button>
					</Link>
					<Link to="/contact">
						<button>Contact</button>
					</Link>
					<div className={landingStyle.social}>
						<TiSocialFacebook />
						<TiSocialInstagram />
						<TiSocialTwitter />
						<FaSpotify />
					</div>
				</div>
			</header>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
		contact: state.contact,
	};
};

export default connect(mapStateToProps, { addRef, setActive, setCurrent, setModalState })(Landing);
