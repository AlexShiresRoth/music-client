import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Checkout.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { removeFromCart, updateCart } from '../../../actions/store';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const CheckoutForm = ({ item, index, removeFromCart, updateCart }) => {
	const [formData, setFormData] = useState({
		quantity: 1,
	});

	const { quantity } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		const itemData = {
			id: item._id,
			quantity,
			amount: item.amount * quantity,
		};
		updateCart(itemData);
	}, [quantity, item._id, item.amount, updateCart, item.quantity]);

	return (
		<div className={style.item} key={index}>
			<img src={`${item.image}`} alt={item.name} />
			<div className={style.description}>
				<p>
					<span>Item:</span>
					{item.name}
				</p>

				<p>
					<span>Price Per Item:</span>${item.amount}
				</p>
				<p>
					<span>Total For Item:</span>$
					{quantity > parseInt(item.quantity)
						? parseInt(item.quantity) * parseInt(item.amount)
						: parseInt(item.amount) * quantity}
					.00
				</p>
				<p>
					<span>Stock Amt:</span>
					{item.quantity}
				</p>
				<form>
					<label>Quantity:</label>
					<input
						type="number"
						min="1"
						name="quantity"
						max={item.quantity}
						value={quantity}
						onChange={(e) => {
							onChange(e);
						}}
					/>
				</form>
			</div>
			<button onClick={(e) => removeFromCart(item)}>
				Remove
				<AiFillCloseCircle />
			</button>
		</div>
	);
};

CheckoutForm.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	removeFromCart: PropTypes.func.isRequired,
};

const mapStateToPros = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToPros, { removeFromCart, updateCart })(CheckoutForm);
