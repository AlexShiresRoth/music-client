import React from 'react';
import style from './Account.module.scss';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FaKey, FaUserEdit, FaStore, FaSadTear } from 'react-icons/fa';

const Account = ({ auth: { isAuthenticated, user, loading }, setAlert }) => {
	const dispatch = useDispatch();

	if (!isAuthenticated) {
		dispatch(setAlert('You must be logged in.', 'danger'));
		return <Redirect to="/store" />;
	}

	return !loading ? (
		<section className={style.section}>
			<div className={style.account_container}>
				<h2>Manage Account</h2>
				<div className={style.container}>
					<div className={style.col}>
						<h3>
							<AiOutlineUser />
							User
						</h3>
						<div className={style.row}>
							<p>
								<span>User's Name:</span> {user.name}
							</p>
							<p>
								<span>Current Email:</span> {user.email}
							</p>
						</div>
					</div>
					<div className={style.col}>
						<h3>
							<FaUserEdit />
							Account Actions
						</h3>
						<div className={style.row}>
							<button>
								<AiOutlineMail />
								Change Email
							</button>
							<button>
								<FaKey /> Change Password
							</button>
							<button>
								<FaSadTear />
								Delete Account
							</button>
						</div>
					</div>
					<div className={style.col}>
						<h3>
							<FaStore />
							Order History
						</h3>
						<div className={style.row}>
							<Link to="/store/account/vieworders">
								<button>View Past Orders</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	) : (
		<div>
			<p>Loading...</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { setAlert })(withRouter(Account));
