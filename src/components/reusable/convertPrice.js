export default (price) => {
	//price must be a string
	return parseFloat(price / 100)
		.toFixed(2)
		.toString();
};
