import React from 'react';
import PropTypes from 'prop-types';
import style from './CartDisplay.module.scss';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { removeFromCart } from '../../../actions/store';
import { connect } from 'react-redux';

const CartDisplay = ({ items, removeFromCart, store: { clientSecret, purchaseItem }, auth: { isAuthenticated } }) => {
	return (
		<div className={style.container}>
			<div className={style.point}>
				<span></span>
			</div>
			<div className={style.cart_display}>
				{items.map((item, i) => {
					return (
						<div className={style.item}>
							<p>
								<span>Item:</span>
								{item.name.length > 7 ? item.name.substr(0, 7) + '...' : item.name}
							</p>
							<p>
								<span>Price:</span>${item.amount}
							</p>

							<AiFillCloseCircle onClick={(e) => removeFromCart(item)} />
						</div>
					);
				})}
				{!isAuthenticated ? (
					<button>Please Login or Create an Account To Checkout</button>
				) : clientSecret && purchaseItem ? (
					<Link to={`/store/checkout/payment/${purchaseItem._id}`}>
						<button>Return to Checkout</button>
					</Link>
				) : (
					<Link to={`/store/checkout`}>
						<button>Review Cart & Checkout</button>
					</Link>
				)}
			</div>
		</div>
	);
};

CartDisplay.propTypes = {
	items: PropTypes.array.isRequired,
	removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { removeFromCart })(CartDisplay);
