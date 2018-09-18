const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening at port ${port}...`));