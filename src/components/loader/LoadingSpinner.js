import React from 'react';
import style from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
	return (
		<section className={style.section}>
			<div className={style.spinner_container}>
				<div className={style.spinner}></div>
				<div className={style.spinner}></div>
			</div>
		</section>
	);
};
