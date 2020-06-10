import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Checkout.module.scss';
import PriceDisplay from './PriceDisplay';
import { Redirect } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Checkout = ({ store: { cart, clientSecret, purchaseItem } }) => {
	const [total, setTotal] = useState(0);

	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}
	if (clientSecret && purchaseItem) {
		return <Redirect to={`/store/checkout/payment/${purchaseItem._id}`} />;
	}

	return (
		<div className={style.container}>
			<h2>Cart Review</h2>
			<p>Please review your selected items to make sure everything is correct.</p>
			{cart.map((item, i) => {
				return <CheckoutForm item={item} index={i} total={total} setTotal={setTotal} />;
			})}
			{cart.length > 0 ? <PriceDisplay total={total} /> : null}
		</div>
	);
};

Checkout.propTypes = {
	cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Checkout);
