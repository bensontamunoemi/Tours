import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name must be provided'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour duration must be provided'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour max group size must be provided'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour difficulty must be provided'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuality: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour price must be provided'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour summary must be provided'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour image cover must be provided'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false, // createdAt will not be returned
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
