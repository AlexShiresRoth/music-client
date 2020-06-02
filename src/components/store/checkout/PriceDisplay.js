import React from 'react';
import style from './PriceDisplay.module.scss';
import { connect } from 'react-redux';

const PriceDisplay = ({ checkout, store: { cart } }) => {
	const total = cart.reduce((acc, next) => {
		return (acc += parseInt(next.amount));
	}, 0);

	console.log(total);
	return (
		<div className={style.total_container}>
			<p>
				<span>Your total:</span>${total}
			</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(PriceDisplay);
