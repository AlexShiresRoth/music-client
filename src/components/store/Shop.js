import React from 'react';
import style from './Shop.module.scss';
import ShopGrid from './ShopGrid';
const Shop = () => {
	return (
		<section className={style.section}>
			<div className={style.banner}>
				<div className={style.overlay}></div>
				<h2>Shop Merch</h2>
			</div>
			<ShopGrid />
		</section>
	);
};

export default Shop;
