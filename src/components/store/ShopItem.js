import React from 'react';
import PropTypes from 'prop-types';

const ShopItem = ({ elements: { amount, quantity, description, uploadDate, image, name, _id } }) => {
	return (
		<div>
			<div>
				<img src={`${image}`} alt={name} />
			</div>
		</div>
	);
};

export default ShopItem;
