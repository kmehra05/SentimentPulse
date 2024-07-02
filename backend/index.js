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

const port = process.env.PORT || 8081;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server Started at ${port}`);
});


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const serverless = require('serverless-http');

// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const mongoString = process.env.MONGODB_URI;
// mongoose.connect(mongoString);

// const database = mongoose.connection;
// database.on('error', (error) => {
//   console.log(error);
// });

// database.once('open', () => {
//   console.log('Database Connected');
// });

// const newsRouter = require('./routes/news');
// app.use('/api/news', newsRouter);
// app.use('/api/', newsRouter);

// // Comment out the app.listen part for Lambda deployment
// // const port = process.env.PORT || 8081;
// // app.listen(port, '0.0.0.0', () => {
// //   console.log(`Server Started at ${port}`);
// // });

// module.exports.handler = serverless(app);
