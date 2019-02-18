import Slider from '../models/SliderModel';
import deleteFile from '../utils/deleteFile';

exports.list_all_sliders = function (req, res) {
    Slider.find({}, (err, slider) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(slider);
    });
};

exports.list_all_active_sliders = function (req, res) {
    Slider.find({isActive: true}, (err, slider) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(slider);
    });
};

exports.create_a_slider = function (req, res) {
    if (!req.file) res.status(500).json({ errors: { global: 'Please upload a file' } });
    else {
        const newSlider = new Slider({
            title: req.body.title,
            subtitle: req.body.subtitle,
            sliderImage: req.file.location,
            description: req.body.description,
            order: req.body.order,
            isActive: req.body.isActive
        });
        newSlider.save((err, slider) => {
            if (err)
                res.status(500).json({ errors: { global: err.message } });
            res.json(slider);
        });
    }
};

exports.read_a_slider = function (req, res) {
    Slider.findById(req.params.sliderId, (err, slider) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(slider);
    });
};

exports.update_a_slider = function (req, res) {
    const updateSlider = {};
    updateSlider.title = req.body.title;
    updateSlider.subtitle = req.body.subtitle;
    updateSlider.description = req.body.description;
    updateSlider.order = req.body.order;
    updateSlider.isActive = req.body.isActive;
    if (req.file)
        Slider.findById(req.params.sliderId, (error, slider) => {
            if (error)
                res.status(500).json({ errors: { global: error.message } });
            if (slider) {
                deleteFile(slider.sliderImage);
                updateSlider.sliderImage = req.file.location;
                Slider.findOneAndUpdate({ _id: req.params.sliderId }, updateSlider, { new: true }, (err, slid) => {
                    if (err)
                        res.status(500).json({ errors: { global: err.message } });
                    res.json(slid);
                });
            } else {
                res.status(500).json({ errors: { global: 'Record not found' } });
            }
        });
    else
        Slider.findOneAndUpdate({ _id: req.params.sliderId }, updateSlider, { new: true }, (err, slider) => {
            if (err)
                res.status(500).json({ errors: { global: err.message } });
            res.json(slider);
        });
};

exports.delete_a_slider = function (req, res) {
    Slider.findById(req.params.sliderId, (err, slider) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        else if (slider) {
            // deleteFile(slider.sliderImage);
            Slider.remove({ _id: req.params.sliderId }, (error) => {
                if (error)
                    res.status(500).json({ errors: { global: error.message } });
                res.json({ message: 'Slider successfully deleted' });
            });
        } else {
            res.status(500).json({ errors: { global: 'Record not found' } });
        }
    });
};