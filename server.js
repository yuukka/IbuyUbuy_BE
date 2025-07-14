var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const { clerkMiddleware, requireAuth } = require('@clerk/express');

require("dotenv").config();
require("./config/database");

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(clerkMiddleware())
//app.use(requireAuth()) // apply clerk auth to all routes

app.use('/users', requireAuth(), usersRouter) // i think this works
app.use('/posts', requireAuth(), postsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(3000, () => {
    console.log('The express app is ready!');
});


module.exports = app;
