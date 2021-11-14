// import User from "../models/User";

var express = require('express');
var router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('crypto').randomBytes(64).toString('hex')



router.get('/getUser', function(req:any,res:any){
	User.find( function(err:any, a:any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json(a.map((a:any) => {
				return {
					userName: a.userName,
					id: a._id,
					password: a.password,
				}
		}));
	});
  });

router.post('/post/user', function(req:any,res:any){
	var a = User({
		userName: req.body.username,
		password: req.body.password,
	});
	a.save(function(err:any, a:any){
		if(err) return res.send(500, 'Error occurred: dnpm install csurfatabase error.');
		res.json({id: a._id});
	});
})

router.post('/login', function(req: any, res: any) {
	User.find({
		userName: req.body.username,
		password: req.body.password,
	}).then((user: any) => {
		if (!user.length) {
		  /*res.render("login", {
			...user,
			msg: "Invalid password or ussername",
		  });*/
		  console.log('Invalid password or ussername')
		  res.send('Invalid password or ussername')
		} else {
		  /*var context = user.map(function (mapUser: any) {
			req.session.username = mapUser.username;
			console.log(mapUser.username);
		  });
		  console.log(user);
		  console.log(req.session.username);
		  res.redirect("/");*/
		  // tao token
		  // luu user name vao session
		  // render home page
		  console.log('Chao mung den dashboard')
		  res.send('Chao mung den dashboard')
		}
	  });
})

module.exports = router;