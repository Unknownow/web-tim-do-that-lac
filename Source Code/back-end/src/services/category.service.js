const Category = require("../models/category.model");
const errorCode = require("../errors/errorCode");
const CustomError = require("../errors/CustomError");

async function createCategory(categoryInfo) {
    categoryInfo.name = categoryInfo.name.toLowerCase();

    let existingCategory = await Category.findOne({ name: categoryInfo.name });

    if (existingCategory) {
        throw new CustomError(errorCode.BAD_REQUEST, "Category already created!");
    }

    const newCategory = await Category.create(categoryInfo);

    return newCategory;
}

async function deleteCategory(categoryName) {
    categoryName = categoryName.toLowerCase();
    let existingCategory = await Category.findOne({ name: categoryName });

    if (!existingCategory) {
        throw new CustomError(errorCode.BAD_REQUEST, "Category does not exist!");
    }

    const category = await Category.deleteOne({ name: categoryName });
    return category;
}

async function updateCategory(categoryName, updatedInfo) {
    const updates = Object.keys(updatedInfo);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update),
    );
  
    if (!isValidOperation) {
      throw new CustomError(
        errorCode.NOT_FOUND,
        'Not figure out the infomation update',
      );
    }

    categoryName = categoryName.toLowerCase();

    let existingCategory = await Category.findOne({name:categoryName});
    if (!existingCategory) {
        throw new CustomError(errorCode.BAD_REQUEST, "Category does not exist!");
    }
    updatedInfo.name = updatedInfo.name.toLowerCase();
    const category = await Category.updateOne({name:categoryName}, updatedInfo);
    return category;
}


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}