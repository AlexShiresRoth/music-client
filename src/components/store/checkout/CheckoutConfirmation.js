import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ConfirmForm from './ConfirmForm';

const stripePromise = loadStripe(
	'pk_test_51GsBquBxHkduRtSFOe73SXUoenzpXNapxkzSbHOwmmrmku9z0Fv39dqoJkXNv774tC5GGLJkMgYiVI0NyQ48hm5W00tLQGMZxO'
);

const CheckoutConfirmation = ({ store: { cart } }) => {
	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}

	return (
		<Elements stripe={stripePromise}>
			<ConfirmForm />
		</Elements>
	);
};

CheckoutConfirmation.propTypes = {
	cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(CheckoutConfirmation);
