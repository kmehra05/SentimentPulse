const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json());

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
app.use('/api/news', newsRouter);

app.listen(3000, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
