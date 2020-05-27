import React from 'react';
import PropTypes from 'prop-types';
import style from './ShopItem.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const ShopItem = ({
	elements: { amount, quantity, description, uploadDate, image, name, _id },
	auth: { isAuthenticated, user, loading },
}) => {
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
				<button>Add To Cart</button>
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStatetoProps, null)(ShopItem);
