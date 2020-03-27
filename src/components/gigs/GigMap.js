import React from 'react';
import PropTypes from 'prop-types';
import gigStyle from './Gigs.module.scss';

const GigMap = ({ gigs }) => {
	const gigMap = gigs.map((gig, i) => {
		return (
			<div className={gigStyle.gig_container}>
				<p>{gig.date}</p>
				<p>{gig.time}</p>
				<p>{gig.location}</p>
				<p>{gig.address}</p>
			</div>
		);
	});

	return <div className={gigStyle.grid}>{gigMap}</div>;
};

GigMap.propTypes = {};

export default GigMap;
