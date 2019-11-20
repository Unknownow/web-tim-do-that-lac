const router = require('express').Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const {
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

router.post('/', auth, asyncMiddleware(createCategory));
router.patch('/:name', auth, asyncMiddleware(updateCategory));
router.delete('/:name', auth, asyncMiddleware(deleteCategory));

module.exports = router;
