import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';

const Cart = ({ store: { cart } }) => {
	const [showCart, setCartState] = useState(false);

	return (
		<div
			className={style.cart}
			onMouseEnter={(e) => setCartState(!showCart)}
			onMouseLeave={(e) => setCartState(!showCart)}
		>
			<button onTouchEnd={(e) => (cart.length > 0 ? setCartState(true) : null)}>Cart({cart.length})</button>
			{showCart && cart.length > 0 ? <CartDisplay items={cart} setCartState={setCartState} /> : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Cart);
