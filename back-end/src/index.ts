const port = 3000
import express from 'express'
import mongoose from 'mongoose';

const createError = require('http-errors');
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
// var express = require('express');
const path = require('path');
const User = require('./routes/User');
const Author = require('./routes/auth');
const Post = require('./routes/post');
const Comment = require('./routes/comment');
const passport = require('passport');


const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })



// var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuoiKi');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("express-session")({key:'sessionId'}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
require('./config/passport');
//passport

app.use(passport.initialize())
app.use(passport.session());




app.use('/api/user', User);
app.use('/api/login', Author);
app.use('/api/post', Post);
app.use('/api/comment', Comment);

app.get('/', (req, res) => {
  res.send('Hello')
})
// module.exports = app;




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})