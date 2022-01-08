var express = require('express');
var router = express.Router();
const Post = require('../models/Post')
var User = require('../models/User')
var verifiedToken = require('../apis/token');
var multer = require('multer')
var moment = require('moment')
// thêm handle upload start
// TO DO .env
var urlLoadImage = 'http://localhost:5000/'

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		if (file.mimetype === 'image/jpeg' 
				|| file.mimetype === 'image/png' 
				|| file.mimetype === 'image/jpg') {
			cb(null, 'src/uploads')
		} else {
			cb(new Error('not image'), false)
		}
	},
	filename: function(req: any, file:any, cb: any) {
		cb(null, file.originalname + Date.now() + '.jpg')
	}
})
var upload = multer({storage:storage})

// thêm handle upload end
// get notification (posts from teacher)
router.get('/notification', function(req: any, res: any){
	User.find({ role: "Admin" }, function(err: any, user: any) {
		Post.find({
				userId: { $in : user.map(function(value: any) { return value._id })}
			}, function(err: any, post: any) {
				res.json(post.map( function(postValue: any) {
					return {
						id: postValue._id,
						content: postValue.content,
						title: postValue.title,
						userId: postValue.userId,
						dateTime: moment(postValue.dateTime).format('L').toString(),
						img: postValue.img,
						record: postValue.record,
						department: postValue.department,
					}
				}))
			}
		)
	})
})

// get notification by search condition
router.get('/search', function(req: any, res: any){
	const title = req.query['title']
	const content = req.query['content']
	const department = req.query['department']
	console.log(title)
	console.log(content)
	console.log(department)
	const match = {
		title: title ? title : { $exists: true },
		content: content ? content : { $exists: true },
		department: department? department : { $exists: true }
	}

	// User.find({ role: "Admin" }, function(err: any, user: any) {
		Post.aggregate([
			{$sort: {content: 1} },
			{$match: {
				...match
			}}
		]).exec( (err: any, resp: any) => {
			console.log('run')
			if(err) return res.send(500, 'Error occurred: database error.');
			res.json(resp.map((value: any) => {
					return {
						id: value._id,
						content: value.content,
						title: value.title,
						userId: value.userId,
						dateTime: moment(value.dateTime).format('L').toString(),
						img: value.img,
						record: value.record,
						department: value.department,
					}
			}));
		})
	// })
})

// get all post
router.get('/', verifiedToken, function(req: any, res: any) {
	Post.find(function(err: any, p: any) {
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json(p.map((value: any) => {
				return {
					id: value._id,
					content: value.content,
					title: value.title,
					userId: value.userId,
					dateTime: moment(value.dateTime).format('L').toString(),
					img: value.img,
					record: value.record,
					department: value.department,
				}
		}));
	});
});

// post/detail
router.get('/:id', verifiedToken, function(req: any, res: any) {
	Post.findById(req.params.id, function(err: any, p: any) {
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json({
			id: p._id,
			content: p.content,
			title: p.title,
			userId: p.userId,
			dateTime: moment(p.dateTime).format('L').toString(),
			img: p.img,
			record: p.record,
			department: p.department,
		});
	});
});

// post/create
router.post('/', verifiedToken, upload.single('imgUpload'), function(req: any, res: any) {
	const file = req.file;
	if (!file) {
		return res.send(500, 'Please upload a file');
	}
	var post = Post({
		content: req.body.content,
		title: req.body.title,
		userId: req.body.userId,
		dateTime: new Date(),
		img: urlLoadImage + file.filename,
		record: req.body.record,
		department: req.body.department,
	});
	post.save(function(err: any, po: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json({id: po._id});
	})
});


// post/edit
router.put('/:id', verifiedToken, function(req: any, res: any) {
	Post.findById(req.params.id, function(err: any, po: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		po.content = req.body.content,
		po.title = req.body.title,
		po.userId = req.body.userId,
		po.img = req.body.img,
		po.record = req.body.record,
		po.department = req.body.department

		po.save(function(err: any, po: any){
			if(err) return res.send(500, 'Error occurred: database error.');
			res.json({id: po._id});
		});
	})
});


// post/delete
router.delete('/:id', verifiedToken, function(req: any, res: any) {
	Post.findById(req.params.id, function(err: any, po: any){
		if (err)
			return res.send(500, 'Error occured: database error.');
		if (!po)
			return res.send(404, 'Id not found');
		po.delete(function(err: any, p: any) {
			if (err)
				return res.send(500, 'Error occured: database error.');
			res.json({
				id: p._id
			})
		})
	})
});


module.exports = router;