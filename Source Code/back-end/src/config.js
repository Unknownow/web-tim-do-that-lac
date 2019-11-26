const dotenv = require("dotenv");

dotenv.config();
// console.log(process.env.CLOUDINARY_CONFIG)
const cloudinaryConfig = JSON.parse(process.env.CLOUDINARY_CONFIG);

module.exports = {
    dbURL: process.env.MONGODB_URL,
    jwtKey: process.env.JWT_SECRET,
    port: process.env.PORT,
    cloudinaryConfig
};