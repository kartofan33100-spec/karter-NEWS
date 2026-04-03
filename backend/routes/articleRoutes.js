const express = require('express');
const {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;