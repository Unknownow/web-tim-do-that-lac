const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const otpEmailSender = require("./otpEmail.service");
const errorCode = require('../errors/errorCode');
const CustomError = require('../errors/CustomError');

async function createAdminUser(userInfo) {
    const isExistEmail = await User.findOne({ email: userInfo.email });
    if (isExistEmail) {
        throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, "Email has already existed");
    }

    if (userInfo.role !== "admin") {
        throw new CustomError(errorCode.FORBIDDEN, "Wrong role!");
    }

    const newAdmin = User.createUser(userInfo);

    return newAdmin;
}

async function createModUser(userInfo) {
    const isExistEmail = await User.findOne({ email: userInfo.email });
    if (isExistEmail) {
        throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, "Email has already existed");
    }

    if (userInfo.role !== "mod") {
        throw new CustomError(errorCode.FORBIDDEN, "Wrong role!");
    }

    const newMod = User.createUser(userInfo);

    return newMod;
}

async function createUser(userInfo) {
    const isExistEmail = await User.findOne({ email: userInfo.email });
    if (isExistEmail) {
        throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, "Email has already existed");
    }

    if (userInfo.role !== "member") {
        throw new CustomError(errorCode.FORBIDDEN, "Wrong role!");
    }

    const newUser = await User.create(userInfo);
    const token = await newUser.generateAuthToken();

    return { newUser, token };
}

async function logIn(email, password) {
    const currentUser = await User.findOne({ "email": email });

    if (!currentUser) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Login failed! User is not existed");
    }

    const isMatch = await bcrypt.compare(password, currentUser.password);
    if (!isMatch) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Login failed! Password is not matched");
    }
    const token = await currentUser.generateAuthToken();
    const role = currentUser.role;

    return { token, role };
}

async function logOut(user, currentToken) {
    user.tokens = user.tokens.filter(({ token }) => token !== currentToken);
    await user.save();
}

async function logOutAll(user) {
    user.tokens = [];
    await user.save();
}

async function updateUser(user, updatedInfo) {
    const updates = Object.keys(updatedInfo);
    const allowUpdate = ["name", "tel", "address"];
    const isValidUpdateInfo = updates.every(update =>
        allowUpdate.includes(update)
    );

    if (!isValidUpdateInfo) {
        throw new CustomError(errorCode.BAD_REQUEST, "Updated info is not valid!");
    }

    updates.forEach(update => {
        user[update] = updatedInfo[update];
    });

    await user.save();
}

async function deleteUser(user) {
    user.remove();
    await user.save();
}

async function forgotPassword(email) {
    const user = await User.findOne({ "email": email });
    if (!user) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find your email!");
    }
    const OTP = await user.generateOTP();
    const result = await otpEmailSender(user.email, OTP);
    return result;
}

async function resetPassword(email, newPassword, OTP) {
    const user = await User.findOne({ "email": email });
    if (!user) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find your email!");
    }

    const isOTPValid = await user.verifyOTP(OTP, newPassword);
    if (!isOTPValid) {
        throw new CustomError(errorCode.UNAUTHORIZED, "OTP is not valid!");
    }

    return user;
}

module.exports = {
    createAdminUser,
    createModUser,
    createUser,
    logIn,
    logOut,
    logOutAll,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword
};