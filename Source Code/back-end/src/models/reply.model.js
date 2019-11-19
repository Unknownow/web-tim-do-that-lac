const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema(
    {
        idPost: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Post"
        },
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            rerquied: false,
            ref: "User",
            default: null
        },
        name: {
            type: String,
            required: true
        },
        tel: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;