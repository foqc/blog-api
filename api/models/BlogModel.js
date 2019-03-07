import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogSchema = Schema({
    title: {
        type: String,
        required: 'Title is required',
        unique: true
    },
    category: {
        type: String,
        required: 'Category is required'
    },
    tags: {
        type: Array,
        required: 'Tags is required at least one'
    },
    url: {
        type: String,
        required: 'URL is required'
    },
    content: {
        type: String,
        required: 'Content, is required'
    },
    isDraft: {
        type: Boolean,
        default: true
    },
    author: {
        name: {
            type: String,
            required: 'Author name, is required'
        },
        username: {
            type: String,
            required: 'username, is required'
        },
        profileImage: {
            type: String,
            required: false
        },
        socialNetworks: {
            type: Array,
            required: false
        }
    }
},
    { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;