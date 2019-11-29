const replyService = require("../services/reply.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createReply(req, res) {
    const { idPost } = req.params;
    const description = JSON.parse(JSON.stringify(req.body)).description;
    const images = req.files;
    const reply = await replyService.createReply(idPost, req.user._id, description, images);

    res.status(201).send({
        status: 1,
        results: reply
    })
}

async function deleteReply(req, res) {
    const { idReply } = req.params;
    const user = req.user;
    const reply = await replyService.deleteReply(idReply, user);

    res.send({
        status: 1,
        deletedReply: reply
    });
}

async function getAllRepliesOfPost(req, res) {
    const { idPost } = req.params;
    const user = req.user;
    const results = await replyService.getAllRepliesOfPost(idPost, user);

    res.status(201).send({
        status: 1,
        results
    });
}

async function getReplyByID(req, res) {
    const { idReply } = req.params;
    const user = req.user;
    const { post, reply } = await replyService.getReplyByID(idReply, user);

    res.status(201).send({
        status: 1,
        results: { post, reply }
    });
}

async function getAllRepliesOfUser(req, res) {
    const user = req.user;
    const results = await replyService.getAllRepliesOfUser(user);

    res.status(201).send({
        status: 1,
        results
    });
}

module.exports = {
    createReply,
    deleteReply,
    getAllRepliesOfPost,
    getReplyByID,
    getAllRepliesOfUser
}