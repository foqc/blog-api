exports.create_a_file = function (req, res) {
    console.log(':::::::::::::::::::::::::::::::::::::::::::::::::<<<<<<<<<<<<<<<<<<<<<<< ', req.file)
    if (!req.file) res.status(500).json({ errors: { global: 'Please upload a file' } });
    else
        res.json(req.file.path);
};