import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import style from './ConfirmForm.module.scss';
import { connect } from 'react-redux';
import { loadItem } from '../../../actions/store';
import ItemDisplay from './ItemDisplay';

const ConfirmForm = ({ store: { purchaseItem, loading }, loadItem }) => {
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		const id = purchaseItem._id;
		loadItem(id);
	}, [loadItem, purchaseItem._id]);

	const [paymentRequest, setPaymentRequest] = useState(null);

	useEffect(() => {
		if (stripe) {
			const pr = stripe.paymentRequest({
				country: 'US',
				currency: 'usd',
				total: {
					label: 'Demo total',
					amount: 1099,
				},
				requestPayerName: true,
				requestPayerEmail: true,
			});
		}
	}, [stripe]);

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			console.log('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
		}
	};

	return (
		<form className={style.form}>
			<ItemDisplay item={purchaseItem} />
			<CardElement />
			<button onClick={(e) => handleSubmit(e)} disabled={!stripe}>
				Pay {loading ? 'Loading...' : '$' + purchaseItem.total}
			</button>
		</form>
	);
};

ConfirmForm.propTypes = {};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { loadItem })(ConfirmForm);
