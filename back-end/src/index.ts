import express from 'express'
import mongoose from 'mongoose';

// await mongoose.connect('mongodb://localhost:27017/web-nang-cao')

const mongodbUrl = 'mongodb://localhost:27017'
const secret = mongoose.connect('mongodb://localhost:27017');
const User = require("./models/User.js");

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const silence = new User({ userName: 'Silence', password: '123' });
  silence.save()
  console.log('ghhj' + silence)
})



// User.find(function () {
//   User({
//     userName: "admin2",
//     password: "123",
//   }).save();
//   console.log("added 1 new User");
// });
User.find(function (err:any, userList:any) {
  if (userList.length) return;
  User({
    username: "admin",
    password: "123",
  }).save();
  console.log("added 1 new User" + userList);
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})