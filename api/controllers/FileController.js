exports.create_a_file = function (req, res) {
    if (!req.file) res.status(500).json({ errors: { global: 'Please upload a file' } });
    else
        res.json(req.file.location);
};