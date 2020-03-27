import React from 'react';
import PropTypes from 'prop-types';
import gigStyle from './Gigs.module.scss';
import { GoCalendar } from 'react-icons/go';

const GigMap = ({ gigs }) => {
	const gigMap = gigs.map((gig, i) => {
		return (
			<div className={gigStyle.gig_container}>
				<GoCalendar />
				<p>{gig.date}</p>
				<p>{gig.time}</p>
				<p>{gig.location}</p>
				<p>{gig.address}</p>
				<button>Event Page</button>
			</div>
		);
	});

	return <div className={gigStyle.grid}>{gigMap}</div>;
};

GigMap.propTypes = {};

export default GigMap;
