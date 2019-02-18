import authenticate from '../middlewares/authenticate';
import user from '../controllers/UserController';

module.exports = function (app) {

    app.route('/users')
        .post(user.register_user);

    app.route('/current_user')
        .get(authenticate, user.current_user);
};