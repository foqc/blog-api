import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SliderSchema = Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    subtitle: {
        type: String,
        required: 'Subtitle is required'
    },
    sliderImage: { type: String, required: true },
    description: {
        type: String,
        required: 'Description is required'
    },
    order: {
        type: Number,
        required: 'Order to show, is required'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Slider = mongoose.model('Slider', SliderSchema);

module.exports = Slider;