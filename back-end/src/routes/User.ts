// import User from "../models/User";

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Department = require('../models/Department');

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
					username: a.username,
					password: a.password,
					department: a.department,		
					role:a.role,
					name:a.name
				}
		}));
	});
});

// user detail
router.get('/:id', function(req: any, res: any){
	User.findById(req.params.id, function(err: any, a: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json({
			id: a._id,
			username: a.username,
			password: a.password,
		});
	});
});

// add one user - admin function
router.post('/', function(req: any, res: any){
	var department: { departmentID: any;departmentName:any }[] = []
	var departmentlist = req.body.department;
	departmentlist.forEach((item: any)=> {
		Department.findOne({_id:item}, (err:any,temp:any)=> {
			department.push({departmentID:item,departmentName:temp.name})
		})
		
	});
	bcrypt.hash(req.body.password, saltRounds).then(function(hash: any) {
		var newUser = new User({
			username: req.body.username,
			password: hash,
			name: req.body.name,
			class: req.body.class,
			avatar: req.body.avatar,
			department: department,
			role: req.body.role
		})
		newUser.save((err: any, user: any) => {
		  if(err) return res.json({success: false, msg: err})
		  res.json({id: user._id,message:'Tạo người dùng thành công'});
		})
	})
})

// edit one user
router.put('/:id', function(req: any, res: any){
	User.findById(req.params.id, function(err: any, u: any) {
        if(err) return res.send(500, 'Error occured: database error');
        if(!u) return res.send(404, 'Id not found');
		// bcrypt.hash(req.body.password, saltRounds).then(function(hash: any) {
			// u.userName = req.body.username;
			u.username = req.body.username,
			u.name = req.body.name,
			u.class = req.body.class,
			u.avatar = req.body.avatar,
			u.department = req.body.department
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
router.delete('/:id', function(req: any, res: any){
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
                username: u.userName,
                password: u.password,
            })
        })
    })
})

module.exports = router;