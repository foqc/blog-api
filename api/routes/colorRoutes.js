import authenticate from '../middlewares/authenticate';
import color from '../controllers/ColorController';

module.exports = function (app) {

    // color Routes
    app.route('/colors')
        .get(authenticate, color.list_all_colors)
        .post(color.create_a_color);

    app.route('/colors/:colorId')
        .get(color.read_a_color)
        .put(color.update_a_color)
        .delete(color.delete_a_color);
};