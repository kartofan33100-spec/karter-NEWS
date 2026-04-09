const express = require('express');
const router = express.Router();

const {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    getMyArticles,
} = require('../controllers/articleController');

const { protect } = require('../middleware/authMiddleware');
const { optionalProtect } = require('../middleware/optionalAuthMiddleware');

router.get('/', getAllArticles);
router.get('/my', protect, getMyArticles);
router.get('/:id', optionalProtect, getArticleById);

router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;