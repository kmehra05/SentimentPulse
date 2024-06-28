const express = require('express');
const newsRouter = require('./controllers/newsController');

const app = express();
app.use(express.json());

app.use('/api/news', newsRouter);

module.exports = app;
