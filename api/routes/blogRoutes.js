import authenticate from '../middlewares/authenticate';
import pagination from '../middlewares/pagination';
import blog from '../controllers/BlogController';

module.exports = function (app) {
    app.route('/blogs')
        .get(authenticate, pagination, blog.list_all_blogs)
        .post(authenticate, blog.create_a_blog);

    app.route('/public/blogs')
        .get(pagination, blog.list_all_active_blogs);

    app.route('/public/blog/:blogUrl')
        .get(blog.read_a_public_active_blog);

    app.route('/blog/:blogId')
        .get(authenticate, blog.read_a_blog)
        .put(authenticate, blog.update_a_blog)
        .delete(authenticate, blog.delete_a_blog);
};