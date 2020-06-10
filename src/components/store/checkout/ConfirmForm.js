import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import style from './ConfirmForm.module.scss';
import { connect } from 'react-redux';
import { loadItem, cancelIntent, paymentSuccess, paymentError } from '../../../actions/store';
import ItemDisplay from './ItemDisplay';
import ConfirmModal from './ConfirmModal';
import { withRouter } from 'react-router-dom';

const ConfirmForm = ({
	store: { purchaseItem, loading, clientSecret },
	loadItem,
	history,
	cancelIntent,
	paymentSuccess,
	paymentError,
}) => {
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		const id = purchaseItem._id;
		loadItem(id);
	}, [loadItem, purchaseItem._id]);

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmCardPayment(`${clientSecret}`, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: purchaseItem.name,
				},
			},
		});

		if (result.error) {
			// Show error to your customer (e.g., insufficient funds)
			console.log(result.error.message);
			paymentError(result.error.message);
		} else {
			// The payment has been processed!
			if (result.paymentIntent.status === 'succeeded') {
				// Show a success message to your customer
				// There's a risk of the customer closing the window before callback
				// execution. Set up a webhook or plugin to listen for the
				// payment_intent.succeeded event that handles any business critical
				// post-payment actions.
				console.log('payment success!');
				paymentSuccess(history);
			}
		}
	};

	const [modalState, setModalState] = useState(false);

	const handleModal = (e) => {
		e.preventDefault();
		setModalState(true);
	};

	const handlePaymentRedirect = (e) => {
		e.preventDefault(e);
		cancelIntent(purchaseItem.payment, history);
	};
	return (
		<>
			<ConfirmModal
				modalState={modalState}
				setModalState={setModalState}
				handleSubmit={handleSubmit}
				total={purchaseItem.total}
			/>
			<form className={style.form}>
				<button onClick={(e) => handlePaymentRedirect(e)}>{'<-'}Go Back/Cancel Order</button>
				<ItemDisplay item={purchaseItem} />
				<CardElement />
				<button onClick={(e) => handleModal(e)} onSubmit={(e) => handleModal(e)} disabled={!stripe}>
					Pay {loading ? 'Loading...' : '$' + purchaseItem.total}
				</button>
			</form>
		</>
	);
};

ConfirmForm.propTypes = {};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { loadItem, cancelIntent, paymentError, paymentSuccess })(
	withRouter(ConfirmForm)
);
