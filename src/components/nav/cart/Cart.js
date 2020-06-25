import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';
import { withRouter } from 'react-router-dom';

const Cart = ({ store: { cart }, history }) => {
	const [showCart, setCartState] = useState(false);
	const [isMobile, handleMobile] = useState(false);

	useEffect(() => {
		if (cart.length === 0) {
			setCartState(false);
		}
	}, [cart.length]);

	useEffect(() => {
		const handleResize = (e) => {
			e.stopPropagation();
			handleMobile(window.innerWidth <= 900);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	//disable use of cart in payment form page
	return cart.length > 0 && !history.location.pathname.includes('payment') ? (
		<div
			className={style.cart}
			onClick={isMobile ? (e) => setCartState(!showCart) : null}
			onMouseEnter={!isMobile ? (e) => setCartState(true) : null}
			onMouseLeave={!isMobile ? (e) => setCartState(false) : null}
		>
			<button>Cart({cart.length})</button>
			{showCart && cart.length > 0 ? (
				<CartDisplay items={cart} setCartState={setCartState} showCart={showCart} />
			) : null}
		</div>
	) : (
		<div className={style.cart}>
			<button>Cart({cart.length})</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(withRouter(Cart));
