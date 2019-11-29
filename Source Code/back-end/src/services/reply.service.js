const Reply = require("../models/reply.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const cloudinary = require("cloudinary").v2;
const replyEmailSender = require("./email.service").replyEmailSender;

async function createReply(idPost, idUser, description, images) {
    const currentUser = await User.findOne(idUser);
    if(currentUser.tel === "null" || currentUser.address === "null"){
        throw new CustomError(errorCode.FORBIDDEN, "Your account is not verified. Please update your tel and address!");
    }

    const newReply = await Reply.create({
        "idPost": idPost,
        "idUser": idUser,
        "description": description,
        imgLinks: []
    });

    if (images) {
        const folderName = idUser + "_folder/reply/" + newReply.id;
        for (let i = 0; i < images.length; i++) {
            let imagesName = "image_" + i.toString() + "_" + Date.now();
            try {
                let result = await cloudinary.uploader.upload(images[i].path, {
                    public_id: imagesName,
                    folder: folderName,
                    eager: { width: 800, height: 800, crop: "fit" }
                });
                newReply.imgLinks = newReply.imgLinks.concat(result.eager[0].url);

            } catch (error) {
                throw new CustomError(errorCode.INTERNAL_SERVER_ERROR, "Upload images failed");
            }
        }
    }
    await newReply.save();
    const post = await Post.findById(newReply.idPost);
    const postOwner = await User.findById(post.idUser);
    const user = await User.findById(newReply.idUser);
    const replyInfo = { title: post.title, name: user.name, email: user.email, tel: user.tel, ...newReply._doc };
    await replyEmailSender(postOwner.email, replyInfo);
    return replyInfo;
}

async function deleteReply(idReply, user) {
    const permittedRole = ["admin", "mod"];
    let isValidToDelete = false;
    const reply = await Reply.findById(idReply);

    for (let i = 0; i < permittedRole.length; i++) {
        if (user.role === permittedRole[i]) {
            isValidToDelete = true;
            break;
        }
    }

    if (!isValidToDelete) {
        if (reply.idUser.toString() !== user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not delete this reply!");
        }
    }

    await Reply.findByIdAndDelete(idReply);
    return reply;
}

async function getAllRepliesOfPost(idPost, user) {
    const permittedRole = ["admin", "mod"];
    let isValidToGetAllReplies = false;
    let post = await Post.findById(idPost);

    for (let i = 0; i < permittedRole.length; i++) {
        if (user.role === permittedRole[i]) {
            isValidToGetAllReplies = true;
            break;
        }
    }
    if (!isValidToGetAllReplies) {
        if (post.idUser.toString() !== user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not get all replies of this post!");
        }
    }
    const postOwner = await User.findById(post.idUser);
    let replies = await Reply.find({ "idPost": idPost });
    for (let i = 0; i < replies.length; i++) {
        const replyOwner = await User.findById(replies[i].idUser);
        replies[i] = { name: replyOwner.name, tel: replyOwner.tel, email: replyOwner.email, ...replies[i]._doc };
    }
    delete post.idUser;
    post = { name: postOwner.name, tel: postOwner.tel, email: postOwner.email, ...post._doc };
    return { post, replies };
}

async function getReplyByID(idReply, user, start, end) {
    const limit = keyword.end - keyword.start + 1;
    const permittedRole = ["admin", "mod"];
    let isValidToDelete = false;
    const reply = await Reply.findById(idReply);

    if (!reply) {
        throw new CustomError(errorCode.NOT_FOUND, "Can not find this reply!");
    }

    for (let i = 0; i < permittedRole.length; i++) {
        if (user.role === permittedRole[i]) {
            isValidToDelete = true;
            break;
        }
    }

    if (!isValidToDelete) {
        const post = await Post.findById(reply.idPost);
        if (reply.idUser.toString() !== user._id.toString() && post.idUser.toString() !== user._id.toString()) {
            throw new CustomError(errorCode.UNAUTHORIZED, "You could not get this reply!");
        }
    }
    let post = await Post.findById(reply.idPost);
    const postOwner = await User.findById(post.idUser);
    post = { name: postOwner.name, tel: postOwner.tel, email: postOwner.email, ...post._doc };
    return { post, reply };
}

async function getAllRepliesOfUser(user) {
    let replies = await Reply.find({ idUser: user._id });
    return { replies };
}

module.exports = {
    createReply,
    deleteReply,
    getAllRepliesOfPost,
    getReplyByID,
    getAllRepliesOfUser
};