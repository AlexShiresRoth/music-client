import React, { useEffect, useState } from 'react';
import ContentMap from './ContentMap';
import bioContent from './bioContent';
import bioStyle from './Bio.module.scss';
import { connect } from 'react-redux';

const Bio = () => {
	const [content, setContent] = useState(false);

	const biocontent = bioContent();

	useEffect(() => {
		setContent(biocontent);
	}, [biocontent]);

	return !content ? (
		<div className={bioStyle.par_grid}>
			<p>Loading...</p>
		</div>
	) : (
		<section className={bioStyle.section} id="bio">
			<ContentMap content={content} />
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, null)(Bio);
