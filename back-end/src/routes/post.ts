var express = require('express');
var router = express.Router();
const Post = require('../models/Post')
var verifiedToken = require('../apis/token');
var multer = require('multer')

// get all post
router.get('/', verifiedToken, function(req: any, res: any) {
	Post.find(function(err: any, p: any) {
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json(p.map((a: any) => {
				return {
					id: p._id,
					content: p.content,
					title: p.title,
					userId: p.userId,
					dateTime: p.dateTime,
					img: p.img,
					record: p.record,
					department: p.department,
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
			dateTime: p.dateTime,
			img: p.img,
			record: p.record,
			department: p.department,
		});
	});
});

// post/create
router.post('/', verifiedToken, function(req: any, res: any) {
	var post = Post({
		content: req.body.content,
		title: req.body.title,
		userId: req.body.userId,
		dateTime: new Date(),
		img: req.file.path,
		record: req.file.path,
		department: req.body.department,
	});
	post.save(function(err: any, po: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		// res.json({id: po._id});
	}).then((result: any) => {
		console.log(result);
		res.status(201).json({
		  message: "Created product successfully",
		  createdProduct: {
			  name: result.name,
			  price: result.price,
			  _id: result._id,
			  request: {
				  type: 'GET',
				  url: "http://localhost:3000/products/" + result._id
			  }
		  }
		});
	  })
	  .catch((err: any) => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
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
})

module.exports = router;