const Review = require('../models/review');
const factory = require('../utils/crudBuilder');




exports.getReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.createFilterObj = (req, res, next) => {
    if (req.params.productId){
        let filterObject = { product: req.params.productId };
        req.filterObj = filterObject;
    }
    next();
  };