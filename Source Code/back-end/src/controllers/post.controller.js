const postService = require("../services/post.service");
const validator = require("validator");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createPost(req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    const newPost = await postService.createPost(req.user._id, req.body, req.files);

    res.status(201).send({
        status: 1,
        results: newPost
    });
}

async function getAllPost(req, res) {
    const posts = await postService.getAllPost(req.user._id);

    res.status(201).send({
        status: 1,
        results: posts
    });
}

async function getPostByIDAfterLogin(req, res) {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid ID');
    }

    const post = await postService.getPostByID(id);
    let canModify = false;
    if (post.idUser.toString() === req.user._id.toString())
        canModify = true;

    res.status(201).send({
        status: 1,
        results: post,
        "canModify": canModify
    });
}

async function getPostByID(req, res) {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid ID');
    }

    const post = await postService.getPostByID(id);
    res.status(201).send({
        status: 1,
        results: post,
    });
}

async function updatePost(req, res) {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid ID');
    }
    const updatedInfo = JSON.parse(JSON.stringify(req.body));
    const post = await postService.updatePost(id, req.user, updatedInfo, req.files);

    res.status(201).send({
        status: 1,
        results: post
    })
}

async function deletePostByID(req, res) {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid ID');
    }

    const deletedPost = await postService.deletePostByID(id);

    res.send({
        status: 1,
        results: deletedPost
    });
}

async function finishPost(req, res) {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid ID');
    }

    const finishedPost = await postService.finishPost(id, req.user);

    res.send({
        status: 1,
        results: finishedPost
    });
}

async function getPostByIndex(req, res) {
    const { start, end } = req.query;

    const listPosts = await postService.getPostByIndex(start, end);
    res.status(201).send({
        status: 1,
        results: listPosts
    });
}

async function searchPost(req, res) {
    const keyword = req.query;
    const listPosts = await postService.searchPost(keyword);
    res.status(201).send({
        status: 1,
        results: listPosts
    });
}

async function uploadFile(req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    const files = req.files;
    postService.uploadFile(files, req.user);
    res.status(201).send({
        status: 1,
        results: req.files[0].buffer
    })
}

module.exports = {
    createPost,
    getAllPost,
    getPostByID,
    updatePost,
    deletePostByID,
    finishPost,
    getPostByIndex,
    getPostByIDAfterLogin,
    searchPost,
    uploadFile
}