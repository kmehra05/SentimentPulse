const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
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
app.use('/api/', newsRouter)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
