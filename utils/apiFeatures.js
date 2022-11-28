class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // this is the mongoose model
    this.queryString = queryString; // this is the query from req.query
  }

  filter() {
    const objectQuery = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];

    excludedFields.forEach((el) => delete objectQuery[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(objectQuery);

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`); // finds gte, gt, le, lte and adds $ to them
    // gte, gt, le, lte  for mongoDb to add the dollar sign $ so mongoDb can recognize the operator when received from the req.query

    /** @type {*}
     *  @private                            \|/ the below shows the greater than operator how it is passed as a query
     * 127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&limit=5
     */
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // sort("-price -ratingsAverage")
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // the will exclude __v from sending to client
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit; // all results that comes before the page we are requesting
    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const numOfTours = await Tour.countDocuments();
    //   if (skip >= numOfTours) throw new Error('This page does not exist');
    // }

    return this;
  }
}

export default APIFeatures;
