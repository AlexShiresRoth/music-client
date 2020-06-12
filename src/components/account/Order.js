import React from 'react';
import PropTypes from 'prop-types';
import style from './Order.module.scss';

const Order = ({ order, index }) => {
	return (
		<div key={index} className={style.order}>
			<h3>
				Order# <span>{order.orderId}</span>
			</h3>
			<div className={style.order_columns}>
				<div className={style.col}>
					<h3>User Purchase Info</h3>

					<p>
						Name Used For Purchase: <span>{order.name}</span>
					</p>
					<p>
						Email Used For Purchase: <span>{order.email}</span>
					</p>
				</div>
				<div className={style.col}>
					<h3>Purchase Details</h3>

					<p>
						Total For Purchase: <span>${order.total}</span>
					</p>
					<p>
						Purchase Date: <span>{order.purchaseDate}</span>
					</p>
				</div>
			</div>
			<div className={style.col}>
				<h3>Items Purchased</h3>
				<div className={style.items_container}>
					<div className={style.overlay}></div>
					<div className={style.overlay}></div>
					<div className={style.items}>
						{order.items.map((item, i) => {
							return (
								<div key={i} className={style.item}>
									<img src={item.image} alt={item.name} />
									<div className={style.item_row}>
										<p>
											Item Name: <span>{item.name}</span>
										</p>
									</div>
									<div className={style.item_row}>
										<p>
											Item Description: <span>{item.description}</span>
										</p>
									</div>
									<div className={style.item_row}>
										<p>
											Price Per Item: <span>${item.amount}</span>
										</p>
									</div>
									<div className={style.item_row}>
										<p>
											Items Purchased This Order: <span>{item.total / item.amount}</span>
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

Order.propTypes = {
	order: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default Order;
