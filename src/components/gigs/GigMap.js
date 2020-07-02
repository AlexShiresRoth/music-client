import React from 'react';
import gigStyle from './Gigs.module.scss';
import { GoCalendar } from 'react-icons/go';

const GigMap = ({ gigs }) => {
	const gigMap = gigs.map((gig, i) => {
		return (
			<div className={gigStyle.gig_container} key={i}>
				<GoCalendar />
				<div className={gigStyle.inner}>
					<div className={gigStyle.col}>
						<h3>{gig.date}</h3>
						<h3>{gig.time}</h3>
					</div>
					<div className={gigStyle.col}>
						<p>@{gig.location}</p>
						<p>{gig.address}</p>
					</div>
					<div className={gigStyle.col}>
						{gig.lineup.map((band, i) => (
							<p key={i}>{i !== gig.lineup.length - 1 ? band + ',' : band}</p>
						))}
					</div>
				</div>
				<button>Event Page</button>
			</div>
		);
	});

	return <div className={gigStyle.grid}>{gigMap}</div>;
};

export default GigMap;
