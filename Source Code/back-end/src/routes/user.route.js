const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const passport = require("passport");
const {
    createAdminUser,
    createModUser,
    createUser,
    logIn,
    logOut,
    logOutAllToken,
    getUserInfo,
    updateUserInfo,
    deleteUser,
    getOTP,
    resetPassword,
    facebookLogin,
    facebookRegister
} = require("../controllers/user.controller");

router.post("/web_management/createUser/admin", auth, asyncMiddleware(createAdminUser));
router.post("/web_management/createUser/mod", auth, asyncMiddleware(createModUser));

router.post("/register", asyncMiddleware(createUser));
router.post("/login", asyncMiddleware(logIn));
router.post("/logout", auth, asyncMiddleware(logOut));
router.post("/logoutAll", auth, asyncMiddleware(logOutAllToken));
router.get("/me", auth, asyncMiddleware(getUserInfo));
router.patch("/me", auth, asyncMiddleware(updateUserInfo));
router.delete('/me', auth, asyncMiddleware(deleteUser));
router.post("/forgotPassword/:email", asyncMiddleware(getOTP));
router.post("/resetPassword/:email", asyncMiddleware(resetPassword));

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get("/login/facebook/callback", passport.authenticate("facebook"), asyncMiddleware(facebookLogin));
router.get("login/facebook/register", auth, )

module.exports = router;