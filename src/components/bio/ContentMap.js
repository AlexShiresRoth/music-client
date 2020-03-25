import React from 'react';
import PropTypes from 'prop-types';
import bioStyles from './Bio.module.scss';

const ContentMap = ({ content }) => {
	console.log(content);
	const contentMap = content.content.map((par, i) => {
		return par.text !== '' ? (
			<div className={bioStyles.par_container}>
				{' '}
				<p>{par.text}</p>
			</div>
		) : null;
	});

	return (
		<div className={bioStyles.par_grid}>
			<div className={bioStyles.bio_heading}>
				<h2>Bio</h2>
			</div>{' '}
			{contentMap}
		</div>
	);
};

ContentMap.propTypes = {
	content: PropTypes.object.isRequired,
};

export default ContentMap;
