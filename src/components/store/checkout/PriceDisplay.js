import React, { useEffect, useState } from 'react';
import style from './PriceDisplay.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPurchaseItem } from '../../../actions/store';

const PriceDisplay = ({ store: { cart, loading }, history }) => {
	const subtotal = cart.reduce((acc, next) => {
		return (acc += parseInt(next.total));
	}, 0);

	const [total, updateTotal] = useState(0);

	//need to add action for updating total
	useEffect(() => {
		updateTotal(subtotal);
	}, [cart, subtotal]);
	console.log(total);
	return (
		<div className={style.total_container}>
			<p>
				<span>Your total:</span>${loading ? <p>Loading...</p> : subtotal + '.00'}
			</p>

			<button onClick={(e) => addPurchaseItem()}>Proceed to Checkout</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(PriceDisplay);
