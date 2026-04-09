const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
    getPendingArticles,
    approveArticle,
    rejectArticle,
} = require('../controllers/adminController');

router.get('/articles/pending', protect, adminOnly, getPendingArticles);
router.put('/articles/:id/approve', protect, adminOnly, approveArticle);
router.put('/articles/:id/reject', protect, adminOnly, rejectArticle);

module.exports = router;