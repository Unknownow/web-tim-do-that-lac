const userService = require("../services/user.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createAdminUser(req, res) {
    const currentUser = req.user;
    if (currentUser.role !== "admin") {
        throw new CustomError(errorCode.FORBIDDEN, "Not permitted to create this user!");
    }

    const admin = await userService.createAdminUser(req.body);
    res.status(201).send({
        status: 1,
        results: admin
    });
}

async function createModUser(req, res) {
    const currentUser = req.user;
    if (currentUser.role !== "admin" && currentUser.role !== "mod") {
        throw new CustomError(errorCode.FORBIDDEN, "Not permitted to create this user!");
    }

    const mod = await userService.createAdminUser(req.body);
    res.status(201).send({
        status: 1,
        results: mod
    });
}

async function createUser(req, res) {
    const { user, token } = await userService.createUser(req.body);
    res.status(201).send({
        status: 1,
        results: { user, token }
    });
}

async function logIn(req, res) {
    const { email, password } = req.body;
    const { token, role } = await userService.logIn(email, password);
    res.send({
        status: 1,
        results: { token, role }
    });
}

async function logOut(req, res) {
    await userService.logOut(req.user, req.token);
    res.send({ status: 1 });
}

async function logOutAllToken(req, res) {
    await userService.logOutAll(req.user);
    res.send({ status: 1 });
}

async function getUserInfo(req, res) {
    const user = req.user;
    delete user.otp;
    res.send({
        status: 1,
        results: user
    });
}

async function updateUserInfo(req, res) {
    await userService.updateUser(req.user, req.body);
    res.send({
        status: 1,
        results: req.user
    });
}

async function deleteUser(req, res) {
    await userService.deleteUser(req.user);
    res.send({
        status: 1,
        results: req.user
    });
}

async function getOTP(req, res) {
    const { email } = req.params;
    const emailResult = await userService.forgotPassword(email)
    res.send({
        status: 1,
        results: {
            email: req.params,
            "emailResult": emailResult
        }
    });
}

async function resetPassword(req, res) {
    const { email } = req.params;
    const { otp, password } = req.body;
    const newUser = await userService.resetPassword(email, password, otp);
    res.send({
        status: 1,
        user: newUser
    })
}

async function facebookLogin(req, res) {
    const facebookUser = req.user;
    const results = await userService.facebookLogin(facebookUser);
    res.send({
        status: 1,
        results
    })
}

module.exports = {
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
    facebookLogin
}
