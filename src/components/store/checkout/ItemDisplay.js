import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './ItemDisplay.module.scss';
import { connect } from 'react-redux';
import { retrieveIntent } from '../../../actions/store';
import convertPrice from '../../reusable/convertPrice';

const ItemDisplay = ({ item, retrieveIntent }) => {
	useEffect(() => {
		if (item) {
			const id = item.payment;
			retrieveIntent(id);
		}
	}, [item, retrieveIntent]);
	return (
		<div className={style.container}>
			<div className={style.items}>
				{item.items.map((cartItem, i) => {
					return (
						<div className={style.item} key={i}>
							<img src={cartItem.image} alt={cartItem.description} />
							<p>Item:{cartItem.name}</p>
							<p>Cost:${convertPrice(cartItem.total)}</p>
							<p>Quantity: {parseInt(cartItem.total) / parseInt(cartItem.amount)}</p>
						</div>
					);
				})}
			</div>
			<p>
				<span>Total:</span>${convertPrice(item.total)}
			</p>
			<p>
				<span>Name:</span>
				{item.name}
			</p>
			<p>
				<span>Email:</span>
				{item.email}
			</p>
			<p>
				<span>Date:</span>
				{item.purchaseDate}
			</p>
		</div>
	);
};

ItemDisplay.propTypes = {
	item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
	console.log(state);
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { retrieveIntent })(ItemDisplay);
