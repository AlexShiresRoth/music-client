import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './CartDisplay.module.scss';
import { NavLink } from 'react-router-dom';

const CartDisplay = ({ items }) => {
	return (
		<div className={style.cart_display}>
			{items.map((item, i) => {
				return (
					<div className={style.item}>
						<p>{item.name}</p>
						<p>${item.amount}</p>
					</div>
				);
			})}
			<NavLink to={`/store/checkout`}>
				<button>Checkout</button>
			</NavLink>
		</div>
	);
};

CartDisplay.propTypes = {};

export default CartDisplay;
