const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: 200,
        },
        summary: {
            type: String,
            required: [true, 'Summary is required'],
            trim: true,
            maxlength: 500,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['Политика', 'Спорт', 'Финансы', 'Здоровье'],
        },
        image: {
            type: String,
            default: '',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Article', articleSchema);