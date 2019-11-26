const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const config = require("../config");
const UserSchema = mongoose.Schema({
    role: {
        type: String, //"admin" > "mod" > "member"
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new CustomError(errorCode.BAD_REQUEST, 'Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new CustomError(
                    errorCode.BAD_REQUEST,
                    'Password can not contain "password"',
                );
            }
        },
    },
    tel: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
    // isVerified: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    otp: {
        type: String,
        require: false
    }
}, {
    timestamps: true
});

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, config.jwtKey, { expiresIn: "2 days" }); // return String

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

UserSchema.methods.generateOTP = async function() {
    const user = this;
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    user.otp = OTP;
    await user.save();

    return OTP;
}

UserSchema.methods.verifyOTP = async function(OTP, password) {
    const user = this;
    if (user.otp.toString() === OTP.toString()) {
        user.otp = "";
        user.password = password;
        await user.save();
        return true;
    }
    return false;
}

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;