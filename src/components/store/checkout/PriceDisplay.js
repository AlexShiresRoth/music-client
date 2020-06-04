import React from 'react';
import style from './PriceDisplay.module.scss';
import { connect } from 'react-redux';

const PriceDisplay = ({ store: { cart, loading } }) => {
	const subtotal = cart.reduce((acc, next) => {
		return (acc += parseInt(next.total));
	}, 0);

	return (
		<div className={style.total_container}>
			<p>
				<span>Your total:</span>${loading ? <p>Loading...</p> : subtotal + '.00'}
			</p>
			<button>Proceed to Checkout</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(PriceDisplay);
