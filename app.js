// Load environment variables from .env file
require('dotenv').config();

// Import required packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require('body-parser')

// Create express app
var app = express();

// Import required routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up routes = BINDING ROUTES to endpoints
app.use('/', indexRouter);
app.use('/users', usersRouter);


// Add the Swagger UI middleware to the app
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve);
app.get('/doc', swaggerUi.setup(swaggerDocument));

// Import database models
var db = require("./models");

// Sync database with models
db.sequelize.sync({ force: false, alter: true })

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

module.exports = app;
