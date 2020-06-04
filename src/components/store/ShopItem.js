import React from 'react';
import PropTypes from 'prop-types';
import style from './ShopItem.module.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/store';
const ShopItem = ({
	elements: { amount, quantity, description, uploadDate, image, name, _id, userAmt, total },
	auth: { isAuthenticated, user, loading },
	addToCart,
	store: { cart },
	removeFromCart,
}) => {
	const item = {
		amount,
		quantity,
		description,
		uploadDate,
		image,
		name,
		_id,
		userAmt,
		total,
	};
	return (
		<div className={style.item}>
			{!loading && user !== null ? isAuthenticated && user.role === 'admin' ? <p>Edit</p> : null : null}
			<div className={style.heading}>
				<img src={`${image}`} alt={name} />
			</div>
			<div className={style.name}>
				<h2>{name}</h2>
			</div>
			<div className={style.description}>
				<p>{description}</p>
			</div>
			<div className={style.price}>
				<p>${amount}</p>
				{quantity > 10 ? (
					<p className={style.in_stock}>In Stock</p>
				) : (
					<p className={style.low_stock}>Running Low</p>
				)}
			</div>
			<div className={style.checkout}>
				{cart.filter((item) => item._id === _id).length > 0 ? (
					<button className={style.added} onClick={(e) => removeFromCart(item)}>
						In Cart!
					</button>
				) : (
					<button onClick={() => addToCart(item)}>Add To Cart</button>
				)}
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		auth: state.auth,
		store: state.store,
	};
};

export default connect(mapStatetoProps, { addToCart, removeFromCart })(ShopItem);
