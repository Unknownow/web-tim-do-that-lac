const Post = require("../models/post.model");
const User = require("../models/user.model");
const Category = require("../models/category.model")
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createPost(idUser, postDetail) {
    for (let i = 0; i < postDetail.categories.length; i++) {
        postDetail.categories[i] = postDetail.categories[i].toLowerCase();
    }

    postDetail.time = new Date(postDetail.time + ":00Z");

    const newPost = await Post.create({ idUser, ...postDetail });
    return newPost;
}

async function getAllPost(idUser) {
    const posts = await Post.find({ "idUser": idUser });

    if (posts.length <= 0) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any post of this user!");
    }

    return posts;
}

async function getPostByID(_id) {
    const post = Post.findById({ _id });

    if (!post) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find post!");
    }

    return post;
}

async function updatePost(_id, user, updatedInfo) {
    const post = await Post.findById(_id);
    if (!post) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find this post!");
    }

    if (post.idUser.toString() !== user._id.toString()) {
        throw new CustomError(errorCode.FORBIDDEN, "You are not permitted to update this post!");
    }

    const updates = Object.keys(updatedInfo);
    const allowedUpdates = ["title", "description", "address", "time"];
    const isValidUpdate = updates.every(update =>
        allowedUpdates.includes(update),
    );

    if (!isValidUpdate) {
        throw new CustomError(errorCode.BAD_REQUEST, "Invalid key in update!");
    }

    if (updatedInfo.categories)
        for (let i = 0; i < updatedInfo.categories.length; i++) {
            updatedInfo.categories[i] = updatedInfo.categories[i].toLowerCase();
        }

    const updatedPost = Post.findByIdAndUpdate(_id, { ...updatedInfo }, { new: true });
    return updatedPost;
}

async function deletePostByID(_id, user) {
    const permittedRole = ["admin", "mod"];
    let isValidToDelete = false;
    const currentPost = await Post.findById(_id);


    for (let i = 0; i < permittedRole.length; i++) {
        if (user.role === permittedRole[i]) {
            isValidToDelete = true;
            break;
        }
    }

    if (isValidToDelete) {
        if (!currentPost.idUser.toString() === user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not delete this post!");
        }
    }

    await Post.findByIdAndDelete(_id);

    return currentPost;
}

async function finishPost(_id, user) {
    const permittedRole = ["admin", "mod"];
    let isValidToMarkFinish = false;
    const finishedPost = await Post.findById(_id);

    for (let i = 0; i < permittedRole.length; i++) {
        if (user.role === permittedRole[i]) {
            isValidToMarkFinish = true;
            break;
        }
    }

    if (!isValidToMarkFinish) {
        if (finishedPost.idUser.toString() !== user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not delete this post!");
        }
    }

    finishedPost.finishedFlag = true;
    await finishedPost.save();
    return finishedPost;
}

async function getPostByIndex(start, end) {
    const limit = end - start + 1;

    let listPosts = await Post.paginate({ finishedFlag: "false" }, { select: ["idUser", "title", "time", "address"], offset: start, limit });
    listPosts = listPosts.docs;

    for (let i = 0; i < listPosts.length; i++) {
        let tempUser = await User.findById(listPosts[i].idUser);
        listPosts[i] = { name: tempUser.name, tel: tempUser.tel, ...listPosts[i]._doc };
        delete listPosts[i]._id;
        delete listPosts[i].idUser;
    }

    return listPosts;
}

async function searchPost(keyword) {
    const limit = keyword.end - keyword.start + 1;
    const start = keyword.start;

    delete keyword.start;
    delete keyword.end;

    if (!keyword.address) {
        keyword.address = { $exists: true };
    }
    else {
        keyword.address = { $regex: new RegExp(keyword.address) }
    }

    if (!keyword.categories) {
        keyword.categories = { $exists: true };
    }
    else {
        keyword.categories = { $in: keyword.categories };
    }

    let regexString = "";
    if(!keyword.keywords){
        keyword.keywords = ".*";
    }
    else if (keyword.keywords instanceof Array) {
        keyword.keywords.forEach(key => {
            regexString += key + "|"
        });
        regexString = regexString.substring(0, regexString.length - 1);
    }
    else{
        regexString = keyword.keywords;
    }
    const regex = new RegExp(regexString);
    keyword.description = keyword.title = { $regex: regex, $options: "$i" };

    let listPosts = await Post.paginate(
        {
            address: keyword.address,
            categories: keyword.categories,
            $or: [
                { description: keyword.description },
                { title: keyword.title },
            ],
            finishedFlag: false
        },
        {
            offset: start,
            limit
        }
    );

    return listPosts.docs;
}

module.exports = {
    createPost,
    getAllPost,
    getPostByID,
    updatePost,
    deletePostByID,
    finishPost,
    getPostByIndex,
    searchPost
}
