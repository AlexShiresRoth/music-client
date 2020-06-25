import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import bioStyles from './Bio.module.scss';
import { addRef, setCurrent } from '../../actions/refs';
import { connect } from 'react-redux';
import IntersectionObserver from 'intersection-observer-polyfill';
const ContentMap = ({ content: { content }, addRef, setCurrent, text, setContentLength, reduced }) => {
	const bioRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setCurrent('bio');
				}
			},
			{ rootMargin: '0px 0px -200px 0px', threshold: 0.5 }
		);
		if (bioRef.current) {
			observer.observe(bioRef.current);
		}
		if (bioRef.current !== null) addRef(bioRef);
	}, [content, addRef, setCurrent]);

	const contentMap = text.map((par, i) => {
		return par.text !== '' ? (
			<div className={bioStyles.par_container} key={i}>
				{' '}
				<p>{par.text}</p>
			</div>
		) : null;
	});

	return (
		<div
			className={
				reduced ? `${bioStyles.par_grid} ${bioStyles.reduced}` : `${bioStyles.par_grid} ${bioStyles.expanded}`
			}
		>
			<div className={bioStyles.bio_heading} ref={bioRef} id="bio">
				<h2>Bio</h2>
			</div>{' '}
			{contentMap}
		</div>
	);
};

ContentMap.propTypes = {
	content: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef, setCurrent })(ContentMap);
