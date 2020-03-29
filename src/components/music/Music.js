import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import musicStyle from './Music.module.scss';
import { FaSpotify } from 'react-icons/fa';
import { addRef, setCurrent } from '../../actions/refs';
import { connect } from 'react-redux';

const Music = ({ addRef, setCurrent }) => {
	const musicRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setCurrent('music');
					//add redux to handle state
				}
			},
			{ rootMargin: '0px 0px 00px 0px', threshold: 0.5 }
		);
		if (musicRef.current) {
			observer.observe(musicRef.current);
		}
		if (musicRef.current !== null) addRef(musicRef);
	}, [addRef, setCurrent]);

	return (
		<section className={musicStyle.section} ref={musicRef} id="music">
			<div className={musicStyle.heading}>
				<h2>Music</h2>
			</div>
			<div className={musicStyle.section_inner}>
				<div className={musicStyle.spotify_container}>
					<iframe
						src="https://open.spotify.com/embed/artist/0KCWJSFxNGPh0izQhx5RAp"
						frameborder="0"
						allowtransparency="true"
						allow="encrypted-media"
						title="spotify-player"
						className={musicStyle.spotify_iframe}
					></iframe>
				</div>
				<div className={musicStyle.text_box}>
					<h3>
						Follow and listen to <br /> Gerry on Spotify
					</h3>
					<div className={musicStyle.actions}>
						<iframe
							src="https://open.spotify.com/follow/1/?uri=spotify:artist:0KCWJSFxNGPh0izQhx5RAp&size=detail&theme=light"
							scrolling="no"
							frameborder="0"
							style={{ border: 'none', overflow: 'hidden' }}
							allowtransparency="true"
							title="spotify-follow-btn"
						></iframe>
						<a
							href="https://open.spotify.com/artist/0KCWJSFxNGPh0izQhx5RAp?si=tKHROhJUTieWq-IcCfupJQ"
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className={musicStyle.spotify_btn}>
								<span>Listen on Spotify</span>
								<FaSpotify />
							</button>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

Music.propTypes = { addRef: PropTypes.func.isRequired, setCurrent: PropTypes.func.isRequired };

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef, setCurrent })(Music);
