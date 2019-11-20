const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");

const {
    createPost,
    getAllPost,
    getPostByID,
    updatePost,
    deletePostByID,
    finishPost,
    getPostByIndex,
    getPostByIDAfterLogin
} = require("../controllers/post.controller");

router.post("/create", auth, asyncMiddleware(createPost));
router.patch("/update/:id", auth, asyncMiddleware(updatePost));
router.get("/getPost/all", auth, asyncMiddleware(getAllPost));
router.get("/getPostAfterLogin/:id", auth, asyncMiddleware(getPostByIDAfterLogin));
router.get("/getPost/:id", asyncMiddleware(getPostByID));
router.get("/getPost/", asyncMiddleware(getPostByIndex));
router.delete("/detele/:id", auth, asyncMiddleware(deletePostByID));
router.patch("/finish/:id", auth, asyncMiddleware(finishPost));

module.exports = router;