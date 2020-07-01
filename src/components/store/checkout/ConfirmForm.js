import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import style from './ConfirmForm.module.scss';
import { connect } from 'react-redux';
import { loadItem, cancelIntent, paymentSuccess, paymentError, updateQuantity } from '../../../actions/store';
import ItemDisplay from './ItemDisplay';
import ConfirmModal from './ConfirmModal';
import { withRouter, Redirect } from 'react-router-dom';
import { FaCcStripe } from 'react-icons/fa';
import { LoadingSpinner } from '../../loader/LoadingSpinner';
import convertPrice from '../../reusable/convertPrice';

const ConfirmForm = ({
	store: { purchaseItem, loading, clientSecret },
	loadItem,
	history,
	cancelIntent,
	paymentSuccess,
	paymentError,
	updateQuantity,
	match,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	useEffect(() => {
		loadItem(match.params.id);
	}, [loadItem, match.params.id]);

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		//look for the item one more time to make sure it hasn't been removed
		const id = purchaseItem._id;

		const foundItem = loadItem(id);

		if (!foundItem) {
			console.error('Clould not locate purchase item');
			paymentError('Clould not locate purchase item');
			return;
		}

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
				//Reduce quantity of item in the store upon success
				purchaseItem.items.map((item) => {
					const quantity =
						parseInt(item.total.includes('.') ? item.total.split('.').slice(0, 1) : item.total) /
						parseInt(item.amount.includes('.') ? item.amount.split('.').slice(0, 1) : item.amount);
					return updateQuantity(quantity, item._id);
				});

				paymentSuccess(history, purchaseItem);
			}
		}
	};

	const [modalState, setModalState] = useState(false);

	const handleModal = (e) => {
		e.preventDefault();

		//look for the item one more time to make sure it hasn't been removed
		const id = purchaseItem._id;

		const foundItem = loadItem(id);

		if (!foundItem) {
			console.error('Clould not locate purchase item');
			paymentError('Clould not locate purchase item');
			return;
		}

		if (!stripe) return;

		setModalState(true);
	};

	const handlePaymentRedirect = (e) => {
		e.preventDefault(e);
		cancelIntent(purchaseItem.payment, history);
	};

	const options = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	if (purchaseItem === null) {
		return <Redirect to="/store/checkout" />;
	}

	return loading ? (
		<LoadingSpinner />
	) : (
		<div className={style.container}>
			<ConfirmModal
				modalState={modalState}
				setModalState={setModalState}
				handleSubmit={handleSubmit}
				total={purchaseItem.total}
			/>
			<button onClick={(e) => handlePaymentRedirect(e)} className={style.go_back_btn}>
				<FiArrowLeft /> Go Back/Cancel Order
			</button>
			<form className={style.form} onSubmit={(e) => handleModal(e)}>
				<div className={style.heading}>
					<h2>Order Summary</h2>
					<p>Please review your selection before checking out. All sales are final.</p>
				</div>

				<ItemDisplay item={purchaseItem} />
				<CardElement id={style.card_element} options={options} />
				{stripe ? (
					<button onSubmit={(e) => handleModal(e)} disabled={!stripe}>
						Pay with <FaCcStripe />
						{loading ? 'Loading...' : '$' + convertPrice(purchaseItem.total)}
					</button>
				) : (
					<button>
						Pay with <FaCcStripe />
						{loading ? 'Loading...' : '$' + convertPrice(purchaseItem.total)}
					</button>
				)}
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { loadItem, cancelIntent, paymentError, paymentSuccess, updateQuantity })(
	withRouter(ConfirmForm)
);
