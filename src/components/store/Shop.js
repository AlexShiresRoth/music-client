import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Shop.module.scss';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import ShopGrid from './ShopGrid';
const Shop = ({ loadUser, auth: { isAuthenticated, user, loading } }) => {
	useEffect(() => {
		if (isAuthenticated) {
			loadUser();
		}
	}, [isAuthenticated, loadUser]);

	return !loading && user ? (
		<section className={style.section}>
			<ShopGrid />
		</section>
	) : (
		<section className={style.section}>
			<ShopGrid />
		</section>
	);
};

Shop.propTypes = {
	loadUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { loadUser })(Shop);
