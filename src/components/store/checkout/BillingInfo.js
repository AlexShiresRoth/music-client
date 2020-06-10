import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './BillingInfo.module.scss';
import { FaCcStripe } from 'react-icons/fa';
import { connect } from 'react-redux';
import { addPurchaseItem } from '../../../actions/store';
import { withRouter } from 'react-router-dom';

const BillingInfo = ({ history, addPurchaseItem, store: { cart, total } }) => {
	const [item, setPurchaseItem] = useState({
		total: null,
		name: '',
		email: '',
		cart: [],
	});

	const { name, email } = item;

	const onChange = (e) => setPurchaseItem({ ...item, [e.target.name]: e.target.value });

	useEffect(() => {
		setPurchaseItem({
			total: total,
			name,
			email,
			cart,
		});
	}, [setPurchaseItem, name, email, total, cart]);

	const handleSubmit = (e) => {
		e.preventDefault();

		addPurchaseItem(item, history);
	};

	return (
		<form className={style.form}>
			<div className={style.input_col}>
				<label>Name</label>
				<input type="text" value={name} name="name" onChange={(e) => onChange(e)} />
			</div>
			<div className={style.input_col}>
				<label>Email</label>
				<input type="text" value={email} name="email" onChange={(e) => onChange(e)} />
			</div>
			<button onClick={(e) => handleSubmit(e)}>
				Proceed to Checkout with <FaCcStripe />
			</button>
		</form>
	);
};

BillingInfo.propTypes = {
	total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { addPurchaseItem })(withRouter(BillingInfo));
