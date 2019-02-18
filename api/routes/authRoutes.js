import auth from '../controllers/AuthController';

module.exports = function (app) {

    app.route('/auth')
        .post(auth.user_authentication);

    app.route('/auth/confirmation')
        .post(auth.confirmation);

    app.route('/auth/reset_password_request')
        .post(auth.reset_password_request);

    app.route('/auth/validate_token')
        .post(auth.validate_token);

    app.route('/auth/reset_password')
        .post(auth.reset_password);
};