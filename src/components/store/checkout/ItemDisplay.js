import React from 'react';
import PropTypes from 'prop-types';
import style from './ItemDisplay.module.scss';

const ItemDisplay = ({ item }) => {
	console.log('hellloooo' + item.payment);
	return (
		<div className={style.container}>
			<div className={style.items}>
				{item.items.map((cartItem, i) => {
					return (
						<div className={style.item} key={i}>
							<img src={cartItem.image} alt={cartItem.description} />
							<p>Item:{cartItem.name}</p>
							<p>Cost:${cartItem.total}.00</p>
							<p>Quantity: {parseInt(cartItem.total) / parseInt(cartItem.amount)}</p>
						</div>
					);
				})}
			</div>
			<p>Total:${item.total}</p>
			<p>{item.name}</p>
			<p>{item.email}</p>
			<p>{item.purchaseDate}</p>
		</div>
	);
};

ItemDisplay.propTypes = {
	item: PropTypes.object.isRequired,
};

export default ItemDisplay;
