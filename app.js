var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); //Require mongoose ODM for mongoDB interaction


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();
var DB_URL = "mongodb+srv://food_app_super_user:YummyFoods@cluster0.h6s8s.mongodb.net/Food_App_DB?retryWrites=true&w=majority" //Link to MongoDB Atlas instance


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Connect to database
mongoose.connect(DB_URL, () => {
  console.log("DB Connected Successfully!");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

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
