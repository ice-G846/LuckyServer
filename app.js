'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let fs = require('fs');
let FileStreamRotator = require('file-stream-rotator');

// 引入mongoose
var mongoose = require('./config/mongoose.js');
var db = mongoose();

var app = express();

// create a write stream (in append mode)
var logDirectory = __dirname + '/logs';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.use(logger('combined', {stream: accessLogStream}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

require('./routes/route_app')(app);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
