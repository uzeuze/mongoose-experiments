process.on('uncaughtException', (err) => {
  console.error(err.stack || err)
});

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// DB Setup
const url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/mongoose-experiments';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`Connection error: ${err}`);
  process.exit(1);
});
db.once('open', () => {
  console.log('Connected to MongoDB server.');
});

// App Setup
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({ message: 'test' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
