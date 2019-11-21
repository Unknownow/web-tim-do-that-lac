module.exports = (keyword) => {
    if (!keyword.address) {
        keyword.address = { $exists: true };
    }
    else {
        keyword.address = { $regex: new RegExp(keyword.address) }
    }

    if (!keyword.categories) {
        keyword.categories = { $exists: true };
    }
    else {
        keyword.categories = { $in: keyword.categories };
    }

    let regexString = "";
    if (!keyword.keywords) {
        keyword.keywords = ".*";
    }
    else if (keyword.keywords instanceof Array) {
        keyword.keywords.forEach(key => {
            regexString += key + "|"
        });
        regexString = regexString.substring(0, regexString.length - 1);
    }
    else {
        regexString = keyword.keywords;
    }
    const regex = new RegExp(regexString);
    keyword.description = keyword.title = { $regex: regex, $options: "$i" };
    return keyword;
}