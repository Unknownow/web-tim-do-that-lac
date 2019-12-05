const dotenv = require("dotenv");

dotenv.config();
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

module.exports = {
    dbURL: process.env.MONGODB_URL,
    jwtKey: process.env.JWT_SECRET,
    port: process.env.PORT,
    cloudinaryConfig
};