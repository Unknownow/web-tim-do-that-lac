const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        time: {
            type: Date,
            required: true,
        },
        categories: [{
            type: String,
            required: true,
            trim: true
        }],
        imgLinks: [{
            type: String,
            required: false
        }],
        finishedFlag: {
            type: Boolean,
            required: true,
            default: false
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: 7776000 },
        },
        questions: [{
            type: String,
            trim: true,
            required:false
        }]
    },
    {
        timestamps: true,
    }
);

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;