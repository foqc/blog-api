import Blog from '../models/BlogModel';
import { getNestedObjectKeys, getWords } from '../utils/Utils';

exports.list_all_blogs = function (req, res) {
    const { start, limit } = req.query;
    Blog.find({}, (err, blog) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(blog);
    }).skip(start).limit(limit);
};

exports.list_all_active_blogs = function (req, res) {
    const { start, limit } = req.query;
    Blog.find({ isDraft: false }, (err, blogs) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });

        const blogSummary = blogs.map(blog => {
            const content = JSON.parse(blog.content);
            const blogText = getNestedObjectKeys(content.blocks, 'text', (object) => object.replace(/\s/g, "") !== '');
            const blogImages = getNestedObjectKeys(content.entityMap, 'type', (object) => object.replace(/\s/g, "") === 'IMAGE');

            const blogWithImg = {
                _id: blog._id,
                title: blogText && blogText.length > 0 ? content.blocks[blogText[0]].text : 'NO TITLE',
                category: blog.category,
                tags: blog.tags,
                url: blog.url,
                content: blogText && blogText.length > 1 ? `${getWords(content.blocks[blogText[1]].text, 60)}...` : 'NO CONTENT',
                updatedAt: blog.updatedAt,
                createdAt: blog.createdAt,
                author: {
                    name: blog.author.name,
                    username: blog.author.username,
                    profileImage: blog.author.profileImage,
                    socialNetworks: blog.author.socialNetworks
                },
                imageUrl: blogImages && blogImages.length > 0 ? content.entityMap[blogImages[0]].data.src : `https://${req.headers.host}/uploads/no_image.jpg`
            };

            return blogWithImg;
        })
        res.json(blogSummary);
    }).skip(start).limit(limit);
};

exports.create_a_blog = function (req, res) {
    req.body.blog.author = {
        name: `${req.currentUser.firstName} ${req.currentUser.lastName}`,
        username: req.currentUser.firstName, socialNetworks: req.currentUser.socialNetworks, profileImage: req.currentUser.profileImage
    };
    req.body.blog.url = req.body.blog.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
    const newBlog = new Blog(req.body.blog);
    newBlog.save((err, blog) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(blog);
    });
};

exports.read_a_blog = function (req, res) {
    if (req.params.blogId.match(/^[0-9a-fA-F]{24}$/))
        Blog.findById(req.params.blogId, (err, blog) => {
            if (err)
                return res.status(500).json({ errors: { global: err.message } });

            if (blog)
                return res.json(blog);
            return res.status(500).json({ errors: { global: 'Record not found' } });
        });
    else
        res.status(500).json({ errors: { global: 'Record not found' } });
};

exports.read_a_public_active_blog = function (req, res) {
    Blog.findOne({ url: req.params.blogUrl, isDraft: false }, (err, blog) => {
        if (err)
            return res.status(500).json({ errors: { global: err.message } });

        if (blog)
            return res.json(blog);
        return res.status(500).json({ errors: { global: 'Record not found' } });
    });
};

exports.update_a_blog = function (req, res) {
    Blog.findOneAndUpdate({ _id: req.params.blogId }, req.body.blog, { new: true }, (err, blog) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(blog);
    });
};

exports.delete_a_blog = function (req, res) {
    Blog.remove({
        _id: req.params.blogId
    }, (err) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json({ message: 'Blog successfully deleted' });
    });
};