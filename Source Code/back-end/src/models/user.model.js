const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
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
        imgLink: {
            type: [String],
            required: false
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;