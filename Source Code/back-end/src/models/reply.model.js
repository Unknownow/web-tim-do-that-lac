const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

const ReplySchema = mongoose.Schema({
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
    }],
    questions: [{
        type: String,
        required: false,
        trim: true
    }],
    answers: [{
        type: String,
        required: false,
        trim: true
    }]
}, {
    timestamps: true
})

// ReplySchema.pre("save", async (next) => {
//     const reply = this;
//     if (reply.answers.length !== reply.questions.length)
//         throw new CustomError(errorCode.BAD_REQUEST, "All questions must be answered!");
//     next();
// })

ReplySchema.plugin(mongoosePaginate);
const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;