const router = require('express').Router();
const asyncMiddleWare = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const {
    replyPost
} = require("../controllers/reply.controller");

router.post('/create/:id', auth, asyncMiddleWare(replyPost));



module.exports = router;