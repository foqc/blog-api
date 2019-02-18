import authenticate from '../middlewares/authenticate';
import fileBlog from '../controllers/FileController';
import upload from '../utils/uploadFile';

const singleUpload = upload.single('file')

module.exports = function (app) {
    app.route('/blogFile')
        .post(authenticate, (req, res, next) => {
            singleUpload(req, res, (err) => {
                if (err)
                    res.status(500).json({ errors: { global: err.message } });
                else
                    next();
            })
        },
        fileBlog.create_a_file);
};