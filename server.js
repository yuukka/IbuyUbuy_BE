const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
// var securityMiddleware = require('./middlewares/security');
// require("./config/database");

//Define Routes Required
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(securityMiddleware.checkJWT); // is just to set req.user

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
// app.use(logger('dev'));

//Define Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(3000, () => {
  console.log('The express app is ready!');
});
