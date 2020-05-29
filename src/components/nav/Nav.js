import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import navStyle from './Nav.module.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { setActive } from '../../actions/refs';
import { AuthorizedLinks } from './AuthorizedLinks';
import { AdminLinks } from './AdminLinks';
import { AuthLinks } from './AuthLinks';
import { NavLinksComponent } from './NavLinksComponent';
import Cart from './cart/Cart';

const Nav = ({
	refs: { active, refs, currentSection },
	setActive,
	history,
	auth: { isAuthenticated, user, loading },
	logoutUser,
}) => {
	const [page, setPage] = useState('');

	const scrollToSection = (refs) => {
		const selectedSection = refs[0];

		const handleScroll = (ref) => {
			window.scrollTo({
				top: ref.current.offsetTop,
				left: 0,
				behavior: 'smooth',
			});
		};

		switch (true) {
			case selectedSection.current.id === 'bio':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'home':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'gigs':
				handleScroll(selectedSection);
				break;
			case selectedSection.current.id === 'music':
				handleScroll(selectedSection);
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		setPage(history.location.pathname);
		setActive(history.location.pathname !== '/');
	}, [history.location.pathname, setActive]);

	return (
		<nav
			className={
				active
					? page !== '/'
						? `${navStyle.nav_reg} ${navStyle.active_nav}`
						: `${navStyle.nav} ${navStyle.active_nav}`
					: `${navStyle.nav}`
			}
		>
			<div className={navStyle.nav_title}>
				<h2>Gerry Mckeveny</h2>
			</div>
			<div className={navStyle.nav_inner}>
				{page !== '/' ? (
					!loading && isAuthenticated && user !== null ? (
						user.role === 'admin' ? (
							<>
								<AdminLinks logoutUser={logoutUser} history={history} />
								<Cart />
							</>
						) : (
							<>
								<AuthorizedLinks logoutUser={logoutUser} history={history} />
								<Cart />
							</>
						)
					) : (
						<>
							<AuthLinks scrollToSection={scrollToSection} refs={refs} currentSection={currentSection} />
							<Cart />
						</>
					)
				) : (
					<NavLinksComponent scrollToSection={scrollToSection} refs={refs} currentSection={currentSection} />
				)}
			</div>
		</nav>
	);
};

Nav.propTypes = {
	refs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		refs: state.refs,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { logoutUser, setActive })(withRouter(Nav));
