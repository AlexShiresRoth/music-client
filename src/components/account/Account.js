import React, { useState, useEffect } from 'react';
import style from './Account.module.scss';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FaKey, FaUserEdit, FaStore, FaSadTear } from 'react-icons/fa';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import ChangeEmail from './ChangeEmail';
import { loadUser } from '../../actions/auth';

const Account = ({
	auth: { isAuthenticated, user, loading },
	loadUser,
	setAlert,
	account: { updateSuccess, emailUpdate },
}) => {
	const dispatch = useDispatch();

	const [isFormShown, setFormState] = useState({
		password: false,
		email: false,
		deleteAccount: false,
	});

	const { password, email, deleteAccount } = isFormShown;

	useEffect(() => {
		loadUser();
	}, [updateSuccess, emailUpdate, loadUser]);

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
							<div className={style.col_actions}>
								<button
									onClick={(e) =>
										setFormState({ deleteAccount: false, email: !email, password: false })
									}
								>
									<AiOutlineMail />
									Change Email
								</button>
								{email ? <ChangeEmail setFormState={setFormState} isFormShown={isFormShown} /> : null}
							</div>
						</div>
						<div className={style.row}>
							<div className={style.col_actions}>
								<button
									onClick={(e) =>
										setFormState({ deleteAccount: false, email: false, password: !password })
									}
								>
									<FaKey /> Change Password
								</button>
								{password ? (
									<ChangePassword setFormState={setFormState} isFormShown={isFormShown} />
								) : null}
							</div>
						</div>
						<div className={style.row}>
							<div className={style.col_actions}>
								<button
									onClick={(e) =>
										setFormState({ deleteAccount: !deleteAccount, email: false, password: false })
									}
								>
									<FaSadTear />
									Delete Account
								</button>
								{deleteAccount ? (
									<DeleteAccount setFormState={setFormState} isFormShown={isFormShown} />
								) : null}
							</div>
						</div>
					</div>
					<div className={style.col}>
						<h3>
							<FaStore />
							Order History
						</h3>
						<div className={style.row}>
							<div className={style.col_actions}>
								<Link to="/store/account/vieworders">
									<button>View Past Orders</button>
								</Link>
							</div>
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
		account: state.account,
	};
};

export default connect(mapStateToProps, { setAlert, loadUser })(withRouter(Account));
