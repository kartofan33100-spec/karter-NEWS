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
            status: 'pending',
        });

        const populatedArticle = await Article.findById(article._id).populate(
            'author',
            'name email'
        );

        res.status(201).json({
            message: 'Article sent for moderation',
            article: populatedArticle,
        });
    } catch (error) {
        next(error);
    }
}

async function getAllArticles(req, res, next) {
    try {
        const { search, category } = req.query;
        const query = { status: 'approved' };

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

        if (article.status !== 'approved') {
            const isAuthor = req.user && article.author._id.toString() === req.user._id.toString();
            const isAdmin = req.user && req.user.role === 'admin';

            if (!isAuthor && !isAdmin) {
                return res.status(403).json({
                    message: 'This article is not published yet',
                });
            }
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

        article.title = title ? title.trim() : article.title;
        article.summary = summary ? summary.trim() : article.summary;
        article.content = content ? content.trim() : article.content;
        article.category = category ?? article.category;
        article.image = image ? image.trim() : article.image;

        article.status = 'pending';

        const updatedArticle = await article.save();

        const populatedArticle = await Article.findById(updatedArticle._id).populate(
            'author',
            'name email'
        );

        res.status(200).json({
            message: 'Article updated and sent for re-moderation',
            article: populatedArticle,
        });
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

async function getMyArticles(req, res, next) {
    try {
        const articles = await Article.find({ author: req.user._id })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(articles);
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
    getMyArticles,
};