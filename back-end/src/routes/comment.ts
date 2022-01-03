var express = require('express');
var router = express.Router();
const Comments = require('../models/Comment')
var verifiedToken = require('../apis/token');

// get comment của bài post => TO DO count numChild > 1
router.get('/', verifiedToken, function(req: any, res: any){
	const postID = req.body.postId;
	if (postID == null) return res.send(400, "Error occurred: Post doesn't exits.");
    Comments.find({ postId : postID}, function(err: any, cmt: any){
        if(err) return res.send(500, 'Error occurred: database error.');
        res.json(cmt.map(function(c: any){
            return {
                content: c.content,
                postId: c.postId,
                userId: c.userId,
                commentTime: c.commentTime,
            }
        }));
    });
});

// thêm comment
router.post('/', verifiedToken, function(req: any, res: any) {
	if (req.body.postId == null) return res.send(400, "Error occurred: Post doesn't exits.");
	var cmt = Comments({
		content: req.body.content,
		postId: req.body.postId,
		userId: req.body.userId,
		commentTime: new Date(),
	});
	cmt.save(function(err: any, c: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json({id: c._id});
	});
});


// chỉnh sửa comment
router.put('/:id', verifiedToken, function(req: any, res: any) {
    Comments.findById(req.params.id, function(err: any, cmt: any){
        if(err) return res.send(500, 'Error occurred: database error.');
        cmt.content =  req.body.content

        cmt.save(function(err: any, c: any){
			if(err) return res.send(500, 'Error occurred: database error.');
			res.json({id: c._id});
		});
    })
});

// xóa comment
router.delete('/:id', verifiedToken, function(req: any, res: any) {
	Comments.findById(req.params.id, function(err: any, cmt: any){
		if (err)
			return res.send(500, 'Error occured: database error.');
		if (!cmt)
			return res.send(404, 'Id not found');
        cmt.delete(function(err: any, c: any) {
			if (err)
				return res.send(500, 'Error occured: database error.');
			res.json({
				id: c._id
			})
		})
	})
})

module.exports = router;