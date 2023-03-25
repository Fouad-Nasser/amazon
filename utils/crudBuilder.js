const asyncHandler = require('express-async-handler');
const ApiOptions = require('./apiOptions');

exports.deleteOne = (Model) => asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if(document){
      res.status(201).send({msg:'deleted successfully'});
    }
    else{
      res.status(401).send('id not found');
    }
  });

exports.updateOne = (Model) => asyncHandler( async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json({ data: document });
  });

exports.createOne = (Model) => asyncHandler( async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model, populationOpt) => asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    // Set query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    // Execute query
    const document = await query;

    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = '') => asyncHandler( async (req, res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  // Build query
  const documentsCounts = await Model.countDocuments();
  const apiFeatures = new ApiOptions(Model.find(filter), req.query)
    .paginate(documentsCounts)
    .filter()
    .search(modelName)
    .limitFields()
    .sort();

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const documents = await mongooseQuery;

  res
    .status(200)
    .json({ results: documents.length, paginationResult, data: documents });
  });