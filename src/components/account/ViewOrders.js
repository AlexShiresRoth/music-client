import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Order from './Order';
import style from './ViewOrders.module.scss';
import { loadOrderHistory } from '../../actions/account';

const ViewOrders = ({ auth: { isAuthenticated, loading, user }, account: { orderHistory }, loadOrderHistory }) => {
	useEffect(() => {
		loadOrderHistory();
	}, [user, loadOrderHistory]);

	if (!isAuthenticated) {
		return <Redirect to="/store" />;
	}
	return !loading && user ? (
		<section className={style.section}>
			<div className={style.container}>
				<h2>Past Orders/Purchases</h2>
				{orderHistory.map((order, i) => {
					return <Order order={order} index={i} />;
				})}
			</div>
		</section>
	) : (
		<p>Loading...</p>
	);
};

ViewOrders.propTypes = {};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		account: state.account,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { loadOrderHistory })(ViewOrders);
