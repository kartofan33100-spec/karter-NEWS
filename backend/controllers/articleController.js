const Article = require('../models/Article');

async function createArticle(req, res, next) {
    try {
        const { title, summary, content, category, image } = req.body;

        if (!title || !summary || !content || !category || !image) {
            return res.status(400).json({
                message: 'Please fill in all required fields',
            });
        }

        const article = await Article.create({
            title: title.trim(),
            summary: summary.trim(),
            content: content.trim(),
            category,
            image: image.trim(),
            author: req.user._id,
        });

        const populatedArticle = await Article.findById(article._id).populate(
            'author',
            'name email'
        );

        res.status(201).json(populatedArticle);
    } catch (error) {
        next(error);
    }
}

async function getAllArticles(req, res, next) {
    try {
        const { search, category } = req.query;
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        const articles = await Article.find(query)
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
}

async function getArticleById(req, res, next) {
    try {
        const article = await Article.findById(req.params.id).populate(
            'author',
            'name email'
        );

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
}

async function updateArticle(req, res, next) {
    try {
        const { title, summary, content, category, image } = req.body;

        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        if (image !== undefined && !image.trim()) {
            return res.status(400).json({
                message: 'Image is required',
            });
        }

        const articleAuthorId = article.author.toString();
        const currentUserId = req.user._id.toString();

        if (articleAuthorId !== currentUserId) {
            return res.status(403).json({
                message: 'Вы можете редактировать только свои статьи',
            });
        }

        article.title = title ?? article.title;
        article.summary = summary ?? article.summary;
        article.content = content ?? article.content;
        article.category = category ?? article.category;
        article.image = image ?? article.image;

        const updatedArticle = await article.save();

        const populatedArticle = await Article.findById(updatedArticle._id).populate(
            'author',
            'name email'
        );

        res.status(200).json(populatedArticle);
    } catch (error) {
        next(error);
    }
}

async function deleteArticle(req, res, next) {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        const articleAuthorId = article.author.toString();
        const currentUserId = req.user._id.toString();

        if (articleAuthorId !== currentUserId) {
            return res.status(403).json({
                message: 'Вы можете удалять только свои статьи',
            });
        }

        await article.deleteOne();

        res.status(200).json({
            message: 'Article deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};