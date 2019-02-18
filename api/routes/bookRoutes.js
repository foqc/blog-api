import authenticate from '../middlewares/authenticate';
import book from '../controllers/BookController';

module.exports = function (app) {
    // book Routes
    app.route('/books')
        .get(authenticate, book.list_all_books)
        .post(authenticate, book.create_a_book);

    app.route('/books/:bookId')
        .get(authenticate, book.read_a_book)
        .put(authenticate, book.update_a_book)
        .delete(authenticate, book.delete_a_book);
};