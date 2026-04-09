const Article = require('../models/Article');

async function getPendingArticles(req, res, next) {
    try {
        const articles = await Article.find({ status: 'pending' })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
}

async function approveArticle(req, res, next) {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        article.status = 'approved';
        await article.save();

        const populatedArticle = await Article.findById(article._id).populate(
            'author',
            'username email'
        );

        res.status(200).json({
            message: 'Article approved successfully',
            article: populatedArticle,
        });
    } catch (error) {
        next(error);
    }
}

async function rejectArticle(req, res, next) {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        article.status = 'rejected';
        await article.save();

        const populatedArticle = await Article.findById(article._id).populate(
            'author',
            'username email'
        );

        res.status(200).json({
            message: 'Article rejected successfully',
            article: populatedArticle,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPendingArticles,
    approveArticle,
    rejectArticle,
};