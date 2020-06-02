import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Checkout.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import PriceDisplay from './PriceDisplay';
import { removeFromCart } from '../../../actions/store';
import { Redirect } from 'react-router-dom';

const Checkout = ({ store: { cart }, removeFromCart }) => {
	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}
	return (
		<div className={style.container}>
			{cart.map((item, i) => {
				return (
					<div className={style.item} key={i}>
						<img src={`${item.image}`} alt={item.name} />
						<div className={style.description}>
							<p>
								<span>Item:</span>
								{item.name}
							</p>

							<p>
								<span>Price:</span>${item.amount}
							</p>
							<p>
								<span>Quantity:</span>
							</p>
						</div>
						<button onClick={(e) => removeFromCart(item)}>
							Remove
							<AiFillCloseCircle />
						</button>
					</div>
				);
			})}
			{cart.length > 0 ? <PriceDisplay /> : null}
		</div>
	);
};

Checkout.propTypes = {
	cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { removeFromCart })(Checkout);
