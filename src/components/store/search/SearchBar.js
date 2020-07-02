import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchBar.module.scss';
import { searchStore } from '../../../actions/store';
import { connect } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
const SearchBar = ({ searchStore }) => {
	const [formData, setFormData] = useState({
		search: '',
	});

	const { search } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		searchStore(formData);
	};

	const clearSearch = (e) => {
		e.preventDefault();
		setFormData({ search: '' });
		searchStore('');
	};

	return (
		<div className={style.container}>
			<p>Search the store by item category or name</p>
			<form onSubmit={(e) => handleSearchSubmit(e)}>
				<input
					type="text"
					name="search"
					value={search}
					onChange={(e) => onChange(e)}
					placeholder="Search for items by category or name"
				/>
				<button onSubmit={(e) => handleSearchSubmit(e)}>
					<AiOutlineSearch />
				</button>
			</form>
			<button onClick={(e) => clearSearch(e)}>Clear Search</button>
		</div>
	);
};

SearchBar.propTypes = {
	searchStore: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { searchStore })(SearchBar);
