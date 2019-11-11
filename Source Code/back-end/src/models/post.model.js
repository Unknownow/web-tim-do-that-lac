const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: true,
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        }]
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;