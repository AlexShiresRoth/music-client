import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Checkout = ({ store: { cart } }) => {
	return (
		<div>
			{cart.map((item, i) => {
				return <div>{item.name}</div>;
			})}
		</div>
	);
};

Checkout.propTypes = {};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Checkout);
