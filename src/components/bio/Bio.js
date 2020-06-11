import React, { useEffect, useState } from 'react';
import ContentMap from './ContentMap';
import bioContent from './bioContent';
import bioStyle from './Bio.module.scss';
import { connect } from 'react-redux';

const Bio = () => {
	const [content, setContent] = useState(false);

	const biocontent = bioContent();

	const [contentLength, setContentLength] = useState({
		text: [],
		reduced: true,
	});

	const { text, reduced } = contentLength;

	useEffect(() => {
		//set the content from the graphql request
		setContent(biocontent);
	}, [biocontent]);

	useEffect(() => {
		//access content from graphql request
		//content.content
		//set content size to reduced initially
		if (content.content) {
			setContentLength({ text: content.content.slice(0, 4), reduced: true });
		}
	}, [setContentLength, content]);

	const changeLength = (e) => {
		setTimeout(() => {
			setContentLength({
				text: reduced ? content.content : content.content.slice(0, 4),
				reduced: !reduced,
			});
		}, 500);
	};

	return !content ? (
		<div className={bioStyle.par_grid}>
			<p>Loading...</p>
		</div>
	) : (
		<section className={bioStyle.section} id="bio">
			<ContentMap content={content} setContentLength={setContentLength} reduced={reduced} text={text} />
			<div className={bioStyle.btn_container}>
				<button className={bioStyle.text_expand_btn} onClick={(e) => changeLength(e)}>
					{reduced ? 'read more...' : 'reduce...'}
				</button>
			</div>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, null)(Bio);
