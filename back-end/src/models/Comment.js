var mongoose = require("mongoose");

const commentStruct = {
    userId: String,
    userName: String,
    content: String,
    commentTime: Date,
    postId: String,
}

const commentSchema = new mongoose.Schema(commentStruct);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;