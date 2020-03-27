import React, { useEffect, useState, useRef } from 'react';
import ContentMap from './ContentMap';
import bioContent from './bioContent';
import bioStyle from './Bio.module.scss';
import { addRef } from '../../actions/refs';
import { connect } from 'react-redux';

const Bio = ({ addRef }) => {
	const [content, setContent] = useState(false);

	const bioRef = useRef();

	const biocontent = bioContent();

	useEffect(() => {
		setContent(biocontent);

		console.log(bioRef);
		if (bioRef) addRef(bioRef);
	}, [biocontent, addRef]);

	return !content ? (
		<div className={bioStyle.par_grid}>
			<p>Loading...</p>
		</div>
	) : (
		<section className={bioStyle.section} ref={bioRef} id="bio">
			<ContentMap content={content} />
		</section>
	);
};

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef })(Bio);
