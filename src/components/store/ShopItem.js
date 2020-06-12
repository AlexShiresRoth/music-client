import React from 'react';
import PropTypes from 'prop-types';
import style from './ShopItem.module.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/store';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
			{!loading && user !== null ? (
				isAuthenticated && user.role === 'admin' ? (
					<Link to={`/store/edit/${_id}`}>
						<FiEdit />
						Edit
					</Link>
				) : null
			) : null}
			<div className={style.heading}>
				<img src={`${image}`} alt={name} />
			</div>
			<div className={style.name}>
				<h2>
					Item Name: <span>{name}</span>
				</h2>
			</div>
			<div className={style.description}>
				<p>
					Description: <span>{description}</span>
				</p>
			</div>
			<div className={style.price}>
				<p>
					Price: <span>${amount}</span>
				</p>
				{quantity > 10 ? (
					<p className={style.in_stock}>In Stock</p>
				) : quantity <= 0 ? (
					<p className={style.out_of_stock}>Out of Stock</p>
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
					<button
						onClick={() => addToCart(item)}
						disabled={quantity <= 0}
						className={quantity <= 0 ? style.disabled_btn : ''}
					>
						Add To Cart
					</button>
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
