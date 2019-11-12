require("./src/database/connect");
const express = require("express");
const mongoose = require("mongoose");

const postService = require("./src/services/post.service");

postService.createPost(
    {
        idUser: "5dca520a1c9d4400004d9ad7"
    },
    {
        idCategory: "5dca52691c9d4400004d9ad9"
    },
    {
        type: "lost",
        title: "Roi do",
        description: "ABC",
        address: "asdka",
        time: new Date()
    }
);

const app = express();