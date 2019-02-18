import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    isbn: {
        type: String,
        required: 'ISBN is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    subtitle:{
        type:String,
        required:'Subtitle is required'
    },
    author:{
        type:String,
        required: 'Author is required'
    },
    published:{
        type:Date,
        required:'When was it published?'
    },
    publisher:{
        type:String,
        required:'A publiher is required'
    },
    pages:{
        type:Number,
        required:'Number of pages is required'
    },
    description:{
        type:String,
        default:'None'
    },
    website:{
        type:String,
        required:'It\'s necessary a website'
    },
    cover:{
        type:String,
        required:'It\'s necessary an url of an image of the book'
    },
    color_ids:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
        required:'A color is required'
    }
});

/* var ColorSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name is required'
    },
    hex: {
        type: String,
        required: 'Color in hexadecimal is required'
    },
  });

var Color = mongoose.model('Color', ColorSchema); */
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;