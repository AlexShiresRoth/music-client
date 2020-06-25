//require('dotenv').config();
const express = require('express');
const http = require('http');
const stripe = require('stripe');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.send('Music client api is running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/shop', require('./routes/storeItems'));
app.use('/api/checkout', require('./routes/purchasing'));

//Mongo db connect
//wtf
const connectDB = async () => {
	const uri = process.env.MONGO_URI;

	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		console.log('Database connected');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

connectDB();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('App is running on port:' + PORT));
