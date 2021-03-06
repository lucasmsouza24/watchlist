process.env.NODE_ENV = 'dev'; // altere para 'production' ou 'dev'

// dependencias
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/users');
var leiturasRouter = require('./routes/leituras');
let mediaRouter = require('./routes/media');

var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/media', mediaRouter);

module.exports = app;
