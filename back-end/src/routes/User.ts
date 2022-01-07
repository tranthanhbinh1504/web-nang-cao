// import User from "../models/User";

var express = require('express');
var router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var verifiedToken = require('../apis/token');


// list user
router.get('/', function(req: any, res: any){
	User.find( function(err: any, a: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json(a.map((a: any) => {
				return {
					id: a._id,
					userName: a.userName,
					password: a.password,
				}
		}));
	});
});

// user detail
router.get('/:id', verifiedToken, function(req: any, res: any){
	User.findById(req.params.id, function(err: any, a: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json({
			id: a._id,
			userName: a.userName,
			password: a.password,
		});
	});
});

// add one user - admin function
router.post('/', function(req: any, res: any){
	bcrypt.hash(req.body.password, saltRounds).then(function(hash: any) {
		var newUser = new User({
			userName: req.body.username,
			password: hash,
			name: req.body.name,
			class: req.body.class,
			avatar: req.body.avatar,
			department: {
				departmentID: req.body.departmentID,
				departmentName: req.body.departmentName,
			  },
			role: req.body.role
		})
		newUser.save((err: any, user: any) => {
		  if(err) return res.json({success: false, msg: err})
		//   if(err) return res.send(500, 'Error occurred: dnpm install csurfatabase error.');
		  res.json({id: user._id});
		})
	})
})

// edit one user
router.put('/:id', verifiedToken, function(req: any, res: any){
	User.findById(req.params.id, function(err: any, u: any) {
        if(err) return res.send(500, 'Error occured: database error');
        if(!u) return res.send(404, 'Id not found');
		// bcrypt.hash(req.body.password, saltRounds).then(function(hash: any) {
			// u.userName = req.body.username;
			u.userName = req.body.username,
			u.name = req.body.name,
			u.class = req.body.class,
			u.avatar = req.body.avatar,
			u.department = {
				departmentID: req.body.departmentID,
				departmentName: req.body.departmentName,
			},
			u.role = req.body.role
		
			u.save(function(err: any, u: any){
				if(err) return res.send(500, 'Error occurred: database error.');
				res.json({id: u._id});
			});
		// })
	});
})

// change password TO DO: confirm pass => chuyen sang auth-login
router.put('/changePassword/:id', verifiedToken, function(req: any, res: any){
	User.findById(req.params.id, function(err: any, u: any) {
        if(err) return res.send(500, 'Error occured: database error');
        if(!u) return res.send(404, 'Id not found');
		bcrypt.hash(req.body.password, saltRounds).then(function(hash: any) {
			u.password = hash;
		
			u.save(function(err: any, u: any){
				if(err) return res.send(500, 'Error occurred: database error.');
				res.json({id: u._id});
			});
		})
	});
})

// delete user
router.delete('/:id', verifiedToken, function(req: any, res: any){
    User.findById(req.params.id, function(err: any, u:any){
        if (err)
            return res.send(500, 'Error occured: database error.');
        if (!u)
            return res.send(404, 'Id not found');
        u.delete( function(err: any, u: any){
            if (err)
                return res.send(500, 'Error occured: database error.');
            res.json({
                id: u._id,
                userName: u.userName,
                password: u.password,
            })
        })
    })
})

module.exports = router;