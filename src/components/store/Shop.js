import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Shop.module.scss';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
const Shop = ({ loadUser, auth: { isAuthenticated, user, loading } }) => {
	useEffect(() => {
		if (isAuthenticated) {
			loadUser();
		}
	}, [isAuthenticated, loadUser]);
	console.log(user);
	return !loading && user ? (
		<section className={style.section}>
			<h1>{user.name}</h1>
		</section>
	) : (
		<section className={style.section}>
			<p>loading</p>
		</section>
	);
};

Shop.propTypes = {
	loadUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { loadUser })(Shop);
