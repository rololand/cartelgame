const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
});

const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);

const herosRouter = require('./routes/heros.js');
app.use('/heros', herosRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
