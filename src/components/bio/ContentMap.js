import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import bioStyles from './Bio.module.scss';
import { addRef, setCurrent } from '../../actions/refs';
import { connect } from 'react-redux';

const ContentMap = ({ content: { content }, addRef, setCurrent }) => {
	const [contentLength, setContentLength] = useState({
		text: [],
		reduced: true,
	});
	const bioRef = useRef();
	const { text, reduced } = contentLength;

	useEffect(() => {
		setContentLength({ text: content.slice(0, 4), reduced: true });
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					console.log(entry);
					setCurrent('bio');
				}
			},
			{ rootMargin: '0px 0px 0px 0px', threshold: 0.5 }
		);
		if (bioRef.current) {
			observer.observe(bioRef.current);
		}
		if (bioRef) addRef(bioRef);
	}, [content, setContentLength, addRef, setCurrent]);

	const changeLength = e =>
		setTimeout(() => {
			setContentLength({
				text: reduced ? content : content.slice(0, 4),
				reduced: !reduced,
			});
		}, 500);

	const contentMap = text.map((par, i) => {
		return par.text !== '' ? (
			<div className={bioStyles.par_container}>
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
			<button className={bioStyles.text_expand_btn} onClick={e => changeLength(e)}>
				{reduced ? 'read more...' : 'reduce...'}
			</button>
		</div>
	);
};

ContentMap.propTypes = {
	content: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef, setCurrent })(ContentMap);
