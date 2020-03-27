import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import bioStyles from './Bio.module.scss';

const ContentMap = ({ content: { content } }) => {
	const [contentLength, setContentLength] = useState({
		text: [],
		reduced: true,
	});

	const { text, reduced } = contentLength;

	useEffect(() => {
		setContentLength({ text: content.slice(0, 4), reduced: true });
	}, [content, setContentLength]);

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
			<div className={bioStyles.bio_heading}>
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

export default ContentMap;
