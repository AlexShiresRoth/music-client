import React, { useRef, useEffect } from 'react';
import gigStyle from './Gigs.module.scss';
import GigMap from './GigMap';
import { addRef, setCurrent } from '../../actions/refs';
import { connect } from 'react-redux';

const Gigs = ({ addRef, setCurrent }) => {
	const gigsRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					console.log('intersecting');
					setCurrent('gigs');
					//add redux to handle state
				}
			},
			{ rootMargin: '0px 0px 00px 0px', threshold: 0.5 }
		);
		if (gigsRef.current) {
			observer.observe(gigsRef.current);
		}
		if (gigsRef.current !== null) addRef(gigsRef);
	}, [addRef, gigsRef, setCurrent]);

	const gigs = [
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
		{ date: '10/10/20', location: `The Ol' Bar`, time: '7:00pm-9:00pm', address: '1234 bar street, NY' },
	];
	return (
		<section className={gigStyle.section}>
			<div className={gigStyle.heading} ref={gigsRef} id="gigs">
				<h2>Upcoming Gigs</h2>
			</div>
			<GigMap gigs={gigs} />
		</section>
	);
};

const mapStateToProps = state => {
	return {
		refs: state.refs,
	};
};

export default connect(mapStateToProps, { addRef, setCurrent })(Gigs);
