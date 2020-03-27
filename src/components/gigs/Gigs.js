import React, { useRef, useEffect } from 'react';
import gigStyle from './Gigs.module.scss';
import GigMap from './GigMap';
import { addRef } from '../../actions/refs';
import { connect } from 'react-redux';

const Gigs = ({ addRef }) => {
	const gigsRef = useRef();

	useEffect(() => {
		addRef(gigsRef);
	}, [addRef, gigsRef]);

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
		<section className={gigStyle.section} ref={gigsRef} id="gigs">
			<div className={gigStyle.heading}>
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

export default connect(mapStateToProps, { addRef })(Gigs);
