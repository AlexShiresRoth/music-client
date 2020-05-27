import React, { useState } from 'react';
import style from './UploadForm.module.scss';
import { connect } from 'react-redux';
import { uploadToStore } from '../../../actions/store';
import { withRouter } from 'react-router-dom';

const UploadForm = ({ uploadToStore, history }) => {
	const [data, setdata] = useState({
		name: '',
		description: '',
		amount: 0,
		quantity: 0,
		image: '',
	});

	const widget = window.cloudinary.createUploadWidget(
		{
			cloudName: 'snackmanproductions',
			uploadPreset: 'store_upload',
			folder: 'gerry-m',
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info.secure_url);
				setdata({ ...data, image: result.info.secure_url });
				return result.info;
			}
		}
	);

	const { name, description, amount, quantity, image } = data;

	const onChange = (e) => setdata({ ...data, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
		uploadToStore(data, history);
		console.log(data, history);
	};

	const handleWidgetVisibility = (e) => {
		e.preventDefault();
		widget.open();
	};
	return (
		<div className={style.container}>
			<div className={style.grunge_overlay}></div>
			<form className={style.form} onSubmit={(e) => formSubmit(e)}>
				<div className={style.input_col}>
					<label>Add an image for the item.</label>
					<input
						type="text"
						name="image"
						placeholder="Image Url"
						value={image}
						onChange={(e) => onChange(e)}
						required={true}
					></input>
					<button onClick={(e) => handleWidgetVisibility(e)}>Upload Image</button>
				</div>
				<div className={style.input_col}>
					<label>Name the item</label>
					<input
						type="text"
						name="name"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => onChange(e)}
						required={true}
					></input>
				</div>
				<div className={style.input_col}>
					<label>Add a description</label>
					<input
						type="text"
						name="description"
						placeholder="Enter a Description"
						value={description}
						onChange={(e) => onChange(e)}
						required={true}
					></input>
				</div>
				<div className={style.input_col}>
					<label>Add a price</label>
					<input
						type="number"
						name="amount"
						placeholder="Enter a price"
						value={amount}
						onChange={(e) => onChange(e)}
						required={true}
					></input>
				</div>
				<div className={style.input_col}>
					<label>How many are available?</label>
					<input
						type="number"
						name="quantity"
						placeholder="Enter an amount of available stock"
						value={quantity}
						onChange={(e) => onChange(e)}
						required={true}
					></input>
				</div>
				<div className={style.input_col}>
					<button onClick={(e) => formSubmit(e)}>Add item</button>
				</div>
			</form>
		</div>
	);
};

export default connect(null, { uploadToStore })(withRouter(UploadForm));
