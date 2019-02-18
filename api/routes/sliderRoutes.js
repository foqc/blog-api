import authenticate from '../middlewares/authenticate';
import slider from '../controllers/SliderController';
import upload from '../utils/uploadFile';

const singleUpload = upload.single('sliderImage')

module.exports = function (app) {
    // slider Routes
    app.route('/sliders')
        .get(authenticate, slider.list_all_sliders)
        .post(authenticate, (req, res, next) => {
            singleUpload(req, res, (err) => {
                if (err)
                    res.status(500).json({ errors: { global: err.message } });
                else
                    next();
            })
        },
            slider.create_a_slider);

    app.route('/public/sliders')
        .get(slider.list_all_active_sliders);

    app.route('/sliders/:sliderId')
        .get(authenticate, slider.read_a_slider)
        .put(authenticate, (req, res, next) => {
            singleUpload(req, res, (err) => {
                if (err)
                    res.status(500).json({ errors: { global: err.message } });
                else
                    next();
            })
        }, slider.update_a_slider)
        .delete(authenticate, slider.delete_a_slider);
};