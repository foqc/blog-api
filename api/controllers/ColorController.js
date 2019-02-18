import Color from '../models/ColorModel';

exports.list_all_colors = function (req, res) {
    Color.find({}, (err, color) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(color);
    });
};

exports.create_a_color = function (req, res) {
    const newColor = new Color(req.body);
    newColor.save((err, color) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(color);
    });
};

exports.read_a_color = function (req, res) {
    Color.findById(req.params.colorId, (err, color) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(color);
    });
};

exports.update_a_color = function (req, res) {
    Color.findOneAndUpdate({ _id: req.params.colorId }, req.body, { new: true }, (err, color) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(color);
    });
};

exports.delete_a_color = function (req, res) {
    Color.remove({
        _id: req.params.colorId
    }, (err) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json({ message: 'Color successfully deleted' });
    });
};