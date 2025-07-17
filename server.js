const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const { clerkMiddleware, requireAuth } = require('@clerk/express')
const cookieParser = require('cookie-parser')

// import route modules
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
var eventsRouter = require('./routes/events');

// DB
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// essential middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(clerkMiddleware())
app.use(logger('dev'))
app.use(cookieParser()) 

// set "bouncer" on routes 
app.use('/users', requireAuth(), usersRouter) 
app.use('/posts', requireAuth(), postsRouter)
app.use('/events', eventsRouter);


app.listen(3000, () => {
  console.log('The express app is ready!');
});
