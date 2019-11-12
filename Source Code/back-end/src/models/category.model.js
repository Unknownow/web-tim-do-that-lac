const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase:true
        },
        description: {
            type: String,
            required: true
        }
    }
)

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;