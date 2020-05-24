import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadItems } from '../../actions/store';
import ShopItem from './ShopItem';
const ShopGrid = ({ loadItems, store: { items, loading } }) => {
	useEffect(() => {
		loadItems();
	}, [loadItems]);

	return !loading && items !== null ? (
		<div>
			{items.map((item, i) => {
				return <ShopItem elements={item} key={i} />;
			})}
		</div>
	) : (
		<p>Loading...</p>
	);
};

ShopGrid.propTypes = {};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { loadItems })(ShopGrid);
