import path from 'path';
import Tour from '../models/tourModel.js';

const __dirname = path.resolve();

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

const getAllTours = async (req, res) => {
  try {
    // Build the query
    // 1.) Filtering
    const objectQuery = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => {
      delete objectQuery[el];
    });

    // 1.) Advanced Filtering
    let queryStr = JSON.stringify(objectQuery);

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`); // finds gte, gt, le, lte and adds $ to them
    // gte, gt, le, lte  for mongoDb to add the dollar sign $ so mongoDb can recognize the operator when received from the req.query

    console.log('Hello', JSON.parse(queryStr));

    /** @type {*}
     *  @private                            \|/ the below shows the greater than operator how it is passed as a query
     * 127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&limit=5
     */

    const query = Tour.find(JSON.parse(queryStr)).lean().exec();
    // Execute the query
    const tours = await query;

    // Send response to client
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedAt,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
