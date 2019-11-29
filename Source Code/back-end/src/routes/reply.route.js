const router = require('express').Router();
const asyncMiddleWare = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const { fileFilter, storage } = require("../services/multerConfig");
const upload = require("multer")({ storage, fileFilter });


const {
    createReply,
    deleteReply,
    getAllRepliesOfPost,
    getReplyByID,
    getAllRepliesOfUser
} = require("../controllers/reply.controller");

router.post('/create/:idPost', auth, upload.array("images"), asyncMiddleWare(createReply));
router.delete('/delete/:idReply', auth, asyncMiddleWare(deleteReply));


router.get("/getAllReplies/me", auth, asyncMiddleWare(getAllRepliesOfUser));
router.get('/getAllReplies/:idPost', auth, asyncMiddleWare(getAllRepliesOfPost));
router.get("/getReply/:idReply", auth, asyncMiddleWare(getReplyByID));


module.exports = router;