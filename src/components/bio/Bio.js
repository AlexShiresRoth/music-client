import React from 'react';
import ContentMap from './ContentMap';
import bioContent from './bioContent';
import bioStyle from './Bio.module.scss';

const Bio = () => {
	const biocontent = bioContent();

	return !biocontent ? (
		<p>Loading...</p>
	) : (
		<section className={bioStyle.section}>
			<ContentMap content={biocontent} />
		</section>
	);
};

export default Bio;
