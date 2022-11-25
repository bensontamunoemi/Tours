import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name must be provided'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour price must be provided'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
