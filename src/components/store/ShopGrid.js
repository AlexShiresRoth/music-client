import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadItems } from '../../actions/store';
import ShopItem from './ShopItem';
import style from './ShopGrid.module.scss';

const ShopGrid = ({ loadItems, store: { items, loading } }) => {
	useEffect(() => {
		loadItems();
	}, [loadItems]);

	return !loading && items !== null ? (
		<section className={style.grid}>
			{items.length > 0 ? (
				items.map((item, i) => {
					return <ShopItem elements={item} key={i} />;
				})
			) : (
				<p>Looks like the store is empty!</p>
			)}
		</section>
	) : (
		<p>Loading...</p>
	);
};

ShopGrid.propTypes = {};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { loadItems })(ShopGrid);
