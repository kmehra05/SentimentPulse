const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverless = require('serverless-http')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mongoString = process.env.MONGODB_URI;
mongoose.connect(mongoString);

const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});

database.once('open', () => {
  console.log('Database Connected');
});

const newsRouter = require('./routes/news');
app.use('/api/', newsRouter);

const port = process.env.PORT || 3000;

module.exports.handler = serverless(app);