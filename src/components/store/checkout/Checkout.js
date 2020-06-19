import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './Checkout.module.scss';
import PriceDisplay from './PriceDisplay';
import { Redirect } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import BillingInfo from './BillingInfo';

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
			<div className={style.heading}>
				<h2>Order Review</h2>
				<p>Please review your selected items to make sure everything is correct.</p>
			</div>
			{cart.map((item, i) => {
				return <CheckoutForm item={item} index={i} total={total} setTotal={setTotal} key={i} />;
			})}
			{cart.length > 0 ? <PriceDisplay total={total} /> : null}
			<BillingInfo />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Checkout);
