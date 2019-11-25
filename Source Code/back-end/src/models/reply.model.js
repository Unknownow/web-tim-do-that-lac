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
        description: {
            type: String,
            required: true
        },
        imgLinks: [{
            type: String,
            required: false
        }]
    },
    {
        timestamps: true
    }
)

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;