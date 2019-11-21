const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim:true
        },
        type: {
            type: String,
            required: true,
            trim:true
        },
        title: {
            type: String,
            required: true,
            trim:true
        },
        description: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: true,
            trim:true
        },
        time: {
            type: Date,
            required: true,
        },
        categories: [{
            type: String,
            required: true,
            trim:true
        }],
        finishedFlag: {
            type:Boolean,
            required:true,
            default:false
        }
    },
    {
        timestamps: true,
    }
);

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;