const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const { fileFilter, storage } = require("../services/multerConfig");
const upload = require("multer")({ storage, fileFilter });

const {
    createPost,
    getAllPost,
    getPostByID,
    updatePost,
    deletePostByID,
    finishPost,
    getPostByIndex,
    getPostByIDAfterLogin,
    searchPost,
} = require("../controllers/post.controller");

router.post("/create", auth, upload.array("images"), asyncMiddleware(createPost));
router.patch("/update/:id", auth, upload.array("images"), asyncMiddleware(updatePost));
router.get("/getPost/all", auth, asyncMiddleware(getAllPost));
router.get("/getPost/loggedin/:id", auth, asyncMiddleware(getPostByIDAfterLogin));
router.delete("/detele/:id", auth, asyncMiddleware(deletePostByID));
router.patch("/finish/:id", auth, asyncMiddleware(finishPost));


router.get("/getPost", asyncMiddleware(getPostByIndex));
router.get("/getPost/:id", asyncMiddleware(getPostByID));
router.get("/search", asyncMiddleware(searchPost));

module.exports = router;