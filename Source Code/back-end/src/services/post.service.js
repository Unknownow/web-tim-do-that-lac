const Post = require("../models/post.model");
const User = require("../models/user.model");
const Reply = require("../models/reply.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const cloudinary = require("cloudinary").v2;
const keywordFormatter = require("./post.keywordFormatter");
const config = require("../config");

cloudinary.config(config.cloudinaryConfig);

async function createPost(idUser, postDetail, images) {
    const currentUser = await User.findOne(idUser);
    if (currentUser.tel === "null" || currentUser.address === "null") {
        throw new CustomError(errorCode.FORBIDDEN, "Your account is not verified. Please update your tel and address!");
    }

    for (let i = 0; i < postDetail.categories.length; i++) {
        postDetail.categories[i] = postDetail.categories[i].toLowerCase();
    }

    postDetail.time = new Date(postDetail.time + ":00Z");

    const newPost = await Post.create({ idUser, ...postDetail, imgLinks: [] });

    if (images) {
        const folderName = idUser + "_folder/post/" + newPost._id;
        for (let i = 0; i < images.length; i++) {
            let imagesName = "image_" + i.toString() + "_" + Date.now();
            try {
                let result = await cloudinary.uploader.upload(images[i].path, {
                    public_id: imagesName,
                    folder: folderName,
                    eager: { width: 800, height: 800, crop: "fit" }
                });
                newPost.imgLinks = newPost.imgLinks.concat(result.eager[0].url);

            } catch (error) {
                throw new CustomError(errorCode.INTERNAL_SERVER_ERROR, "Upload images failed");
            }
        }
    }

    await newPost.save();

    return newPost;
}

async function getAllPost(idUser) {
    const posts = await Post.find({ "idUser": idUser }).sort({ updatedAt: -1 });

    if (posts.length <= 0) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any post of this user!");
    }

    return posts;
}

async function getPostByID(_id) {
    const post = await Post.findById({ _id });

    if (!post) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find post!");
    }

    const user = await User.findById(post.idUser);

    if (!user) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find user!");
    }

    const currentPost = { name: user.name, tel: user.tel, email: user.email, ...post._doc };

    return currentPost;
}

async function updatePost(_id, user, updatedInfo, images) {
    const post = await Post.findById(_id);
    if (!post) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find this post!");
    }

    if (post.idUser.toString() !== user._id.toString()) {
        throw new CustomError(errorCode.FORBIDDEN, "You are not permitted to update this post!");
    }
    const updates = Object.keys(updatedInfo);
    const allowedUpdates = ["title", "description", "address", "time", "categories"];
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
    if (images) {
        updatedInfo.imgLinks = [];
        const folderName = user._id + "_folder/post/" + post._id;
        for (let i = 0; i < images.length; i++) {
            let imagesName = "image_" + i.toString() + "_" + Date.now();
            try {
                let result = await cloudinary.uploader.upload(images[i].path, {
                    public_id: imagesName,
                    folder: folderName,
                    eager: { width: 800, height: 800, crop: "fit" }
                });
                updatedInfo.imgLinks = updatedInfo.imgLinks.concat(result.eager[0].url);
            } catch (error) {
                throw new CustomError(errorCode.INTERNAL_SERVER_ERROR, "Upload images failed");
            }
        }
        if (post.imgLinks)
            updatedInfo.imgLinks = updatedInfo.imgLinks.concat(post.imgLinks);
    }

    if (updatedInfo.time) {
        updatedInfo.time = new Date(updatedInfo.time + ":00Z");
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

    if (!isValidToDelete) {
        if (!currentPost.idUser.toString() === user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not delete this post!");
        }
    }

    await Reply.deleteMany({ idPost: currentPost._id });
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
        let tempUser = await User.findById(listPosts[i].idUser).sort({ updatedAt: -1 });
        listPosts[i] = { name: tempUser.name, tel: tempUser.tel, ...listPosts[i]._doc };
        delete listPosts[i].idUser;
    }

    return listPosts;
}

async function searchPost(keyword) {
    const limit = keyword.end - keyword.start + 1;
    const start = keyword.start;

    delete keyword.start;
    delete keyword.end;

    keyword = await keywordFormatter(keyword);

    const countDocuments = await Post.countDocuments({
        address: keyword.address,
        categories: keyword.categories,
        $or: [
            { description: keyword.description },
            { title: keyword.title },
        ],
        finishedFlag: false
    });
    let listPosts = await Post.paginate({
        address: keyword.address,
        categories: keyword.categories,
        $or: [
            { description: keyword.description },
            { title: keyword.title },
        ],
        finishedFlag: false
    }, {
        sort: { updatedAT: -1 },
        offset: start,
        limit
    });

    listPosts = listPosts.docs;

    for (let i = 0; i < listPosts.length; i++) {
        const tempUser = await User.findById(listPosts[i].idUser);
        listPosts[i] = { name: tempUser.name, tel: tempUser.tel, email: tempUser.email, ...listPosts[i]._doc };
    }

    return { listPosts, countDocuments };
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