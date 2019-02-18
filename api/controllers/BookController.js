import Book from '../models/BookModel';

exports.list_all_books = function (req, res) {
    Book.find({}, (err, book) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(book);
    });
};

exports.create_a_book = function (req, res) {
    const newBook = new Book(req.body.book);
    newBook.save((err, book) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(book);
    });
};

exports.read_a_book = function (req, res) {
    Book.findById(req.params.bookId, (err, book) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(book);
    });
};

exports.update_a_book = function (req, res) {
    Book.findOneAndUpdate({ _id: req.params.bookId }, req.body.book, { new: true }, (err, book) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json(book);
    });
};

exports.delete_a_book = function (req, res) {
    Book.remove({
        _id: req.params.bookId
    }, (err) => {
        if (err)
            res.status(500).json({ errors: { global: err.message } });
        res.json({ message: 'Book successfully deleted' });
    });
};