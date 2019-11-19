const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const {
    createAdminUser,
    createModUser,
    createUser,
    logIn,
    logOut,
    logOutAllToken,
    getUserInfo,
    updateUserInfo,
    deleteUser
} = require("../controllers/user.controller");

router.post("/web_management/createUser/admin", auth, asyncMiddleware(createAdminUser));
router.post("/web_management/createUser/mod", auth, asyncMiddleware(createModUser));

router.post("/user/register", asyncMiddleware(createUser));
router.post("/user/login", asyncMiddleware(logIn));
router.post("/user/logout", auth, asyncMiddleware(logOut));
router.post("/user/logoutAll", auth, asyncMiddleware(logOutAllToken));
router.get("/user/me", auth, asyncMiddleware(getUserInfo));
router.patch("/user/me", auth, asyncMiddleware(updateUserInfo));
router.delete('/user/me', auth, asyncMiddleware(deleteUser));

module.exports = router;