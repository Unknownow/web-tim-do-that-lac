const Category = require("../models/category.model");

async function createCategory(infoCategory) {
    infoCategory.name = infoCategory.name.toLowerCase();
    let existingCategory = await Category.findOne({ name: infoCategory.name });
    if (existingCategory) {
        console.log("Category Existed");
        return;
    }

    await Category.create(infoCategory, (err, newCategory) => {
        if (err)
            throw err;
        console.log(newCategory);
        return newCategory;
    });
}

async function deleteCategory(categoryName) {
    categoryName = categoryName.toLowerCase();
    let existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
        console.log("Category Not Existed");
        return;
    }

    await Category.deleteOne({ name: categoryName }, (err) => {
        if (err)
            throw err;
        console.log("Deleted successfully");
    });
}

async function updateCategory(categoryName, updatedInfo) {
    categoryName = categoryName.toLowerCase();
    let existingCategory = await Category.findOne({ name: categoryName });

    if (!existingCategory) {
        console.log("Category Not Existed");
        return;
    }

    await Category.updateOne({ name: categoryName }, updatedInfo, (err, updatedCategory) => {
        if (err)
            throw err;
        console.log(updatedCategory);
        return updatedCategory;
    });
}


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}