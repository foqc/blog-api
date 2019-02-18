import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ColorSchema = Schema({
    // _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name is required'
    },
    hex: {
        type: String,
        required: 'Color in hexadecimal is required'
    },
  });
  
const Color = mongoose.model('Color', ColorSchema);

module.exports = Color;