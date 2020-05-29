import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Cart = ({ store: { cart } }) => {
	useEffect(() => {
		console.log(cart);
	}, [cart]);

	return <button>Cart({cart.length})</button>;
};

Cart.propTypes = {};
const mapStateToProps = (state) => {
	console.log(state);
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Cart);
