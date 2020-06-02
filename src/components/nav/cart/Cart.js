import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';

const Cart = ({ store: { cart } }) => {
	const [showCart, setCartState] = useState(false);

	return (
		<div className={style.cart} onMouseEnter={(e) => setCartState(true)} onMouseLeave={(e) => setCartState(false)}>
			<button>Cart({cart.length})</button>
			{showCart && cart.length > 0 ? <CartDisplay items={cart} /> : null}
		</div>
	);
};

Cart.propTypes = {};
const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Cart);
