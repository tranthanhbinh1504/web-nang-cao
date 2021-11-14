import express from 'express'
import mongoose from 'mongoose';

var createError = require('http-errors');
// var express = require('express');
var path = require('path');

var users = require('./routes/index');

// var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuoiKi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);


module.exports = app;