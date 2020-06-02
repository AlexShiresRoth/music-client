import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './CartDisplay.module.scss';
import { NavLink } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { removeFromCart } from '../../../actions/store';
import { connect } from 'react-redux';

const CartDisplay = ({ items, removeFromCart }) => {
	return (
		<div className={style.cart_display}>
			{items.map((item, i) => {
				return (
					<div className={style.item}>
						<p>
							<span>Item:</span>
							{item.name}
						</p>
						<p>
							<span>Price:</span>${item.amount}
						</p>
						<button onClick={(e) => removeFromCart(item)}>
							<AiFillCloseCircle />
						</button>
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

export default connect(null, { removeFromCart })(CartDisplay);
