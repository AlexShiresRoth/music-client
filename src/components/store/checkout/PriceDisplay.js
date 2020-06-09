import React, { useEffect } from 'react';
import style from './PriceDisplay.module.scss';
import { connect } from 'react-redux';
import { updateTotal } from '../../../actions/store';
import BillingInfo from './BillingInfo';

const PriceDisplay = ({ store: { cart, loading }, updateTotal }) => {
	const subtotal = cart.reduce((acc, next) => {
		return (acc += parseInt(next.total));
	}, 0);

	//need to add action for updating total
	useEffect(() => {
		updateTotal(subtotal);
	}, [cart, subtotal, updateTotal]);

	return (
		<div className={style.total_container}>
			<p>
				<span>Your total:</span>${loading ? <p>Loading...</p> : subtotal + '.00'}
			</p>
			<BillingInfo />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { updateTotal })(PriceDisplay);
