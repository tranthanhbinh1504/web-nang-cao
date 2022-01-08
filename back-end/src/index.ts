const port = 5000
import express from 'express'
// import mongoose from 'mongoose';
const mongoose = require('mongoose')
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
const Department = require('./routes/department')
const passport = require('passport');
const cors = require('cors')
const proxy = require('http-proxy-middleware')

const csrfProtection = csrf({ cookie: true })
// const parseForm = bodyParser.urlencoded({ extended: false })

// var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuoiKi');
mongoose.Promise = global.Promise;


const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(require("express-session")({key:'sessionId'}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
require('./config/passport');
//passport

app.use(passport.initialize())
app.use(passport.session());


// upload image
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });


app.use('/api/user', User);
app.use('/api/login', Author);
app.use('/api/post', Post);
app.use('/api/comment', Comment);
app.use('/api/department', Department);

app.get('/', (req, res) => {
  res.send('Hello')
})

// module.exports = app;




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})