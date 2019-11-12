const Post = require("../models/post.model");
const User = require("../models/user.model");

async function createPost(userID, categoryID, postDetail) {
    let newPost = await Post.create({ userID, ...postDetail, categoryID }, (err, post) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        else {
            console.log(post);
            return post;
        }

    });
    return newPost;
}

module.exports = {
    createPost
}
