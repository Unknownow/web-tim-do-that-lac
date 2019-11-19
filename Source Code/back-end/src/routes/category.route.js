const router = require('express').Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const {
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

router.post('/categoryManagement/', auth, asyncMiddleware(createCategory));
router.patch('/categoryManagement/:name', auth, asyncMiddleware(updateCategory));
router.delete('/categoryManagement/:name', auth, asyncMiddleware(deleteCategory));

module.exports = router;
