var mongoose = require("mongoose");

const postStruct = {
    content: String,
    title: String,
    username: String,
    userId: String,
    dateTime: Date,
    img: String,
    record: String,
    department: String,
}
const postSchema = new mongoose.Schema(postStruct);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;