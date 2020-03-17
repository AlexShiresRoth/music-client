const express = require('express');
const stripe = require('stripe');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Music client api is running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('App is running on port:' + PORT));
