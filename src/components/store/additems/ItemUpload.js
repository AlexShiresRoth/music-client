import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../login/Auth';
import style from './ItemUpload.module.scss';
import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import { withRouter } from 'react-router-dom';

const ItemUpload = ({ auth: { isAuthenticated, user, loading } }) => {
	return !loading && user !== null ? (
		isAuthenticated && user.role === 'admin' ? (
			<Auth>
				<div className={style.container}>
					<div className={style.grunge_overlay}></div>
					<div className={style.heading}>
						<h2>Add an item to the store</h2>
					</div>
					<UploadForm />
				</div>
			</Auth>
		) : (
			<Auth>
				<p>You are not authorized to be here!!!!! GET OUT!!!!!</p>
			</Auth>
		)
	) : (
		<Auth>
			<p>You are not authorized to be here!!!!! GET OUT!!!!!</p>
		</Auth>
	);
};

ItemUpload.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(ItemUpload));
