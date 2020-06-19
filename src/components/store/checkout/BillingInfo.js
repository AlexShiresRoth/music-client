import React, { useState, useEffect } from 'react';
import style from './BillingInfo.module.scss';
import { FaCcStripe } from 'react-icons/fa';
import { connect } from 'react-redux';
import { addPurchaseItem } from '../../../actions/store';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const BillingInfo = ({ history, addPurchaseItem, store: { cart, total } }) => {
	const [item, setPurchaseItem] = useState({
		total: null,
		name: '',
		email: '',
		cart: [],
		orderId: '',
	});

	const { name, email } = item;

	const onChange = (e) => setPurchaseItem({ ...item, [e.target.name]: e.target.value });

	useEffect(() => {
		setPurchaseItem({
			total: total,
			name,
			email,
			cart,
			orderId: uuidv4(),
		});
	}, [setPurchaseItem, name, email, total, cart]);

	const handleSubmit = (e) => {
		e.preventDefault();

		addPurchaseItem(item, history);
	};

	return (
		<form className={style.form}>
			<div className={style.heading}>
				<p>Billing Information</p>
			</div>
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
			<div className={style.disclaimer}>
				<p>
					We use{' '}
					<a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
						stripe
					</a>{' '}
					for all our secure transactions.{' '}
				</p>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { addPurchaseItem })(withRouter(BillingInfo));
