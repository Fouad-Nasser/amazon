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

exports.updateOne = (Model,populationOpt) => asyncHandler( async (req, res, next) => {
    let document = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (populationOpt) {
      document = await document.populate(populationOpt);
  
    }
    res.status(200).json({ data: document });
  });


exports.createOne = (Model,populationOpt) => asyncHandler( async (req, res) => {
  let newDoc = await Model.create(req.body)
  console.log(newDoc);
  if (populationOpt) {
    newDoc = await newDoc.populate(populationOpt);
  // console.log('ddd',newDoc);

  }
  res.status(201).json({ data: newDoc });
});
  

exports.getOne = (Model, selectobj, populationOpt) => asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    // Set query
    let query = Model.findById(id)

    if (selectobj) {
      query = query.select(selectobj(res.__('LANG')));
    }

    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    // Execute query
    const document = await query;
console.log(document.fullName,'ddddddddddd');
    res.status(200).json({ data: document });
  });

  exports.getAll = (Model, selectobj, populationOpt, modelName = '') => asyncHandler( async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    // const documentsCounts = await Model.countDocuments();
    let query = Model.find(filter);

    console.log(selectobj,"hhhhhhhhhhhhhhhhhhhh");

    if (selectobj) {
      query = query.select(selectobj(res.__('LANG')));
    }

    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    const apiOptions = new ApiOptions(query, req.query)
      .filter()
      .search(modelName,res.__('LANG'))
      .limitFields()
      .sort();

      let documents = await apiOptions.mongooseQuery;
      const documentsCounts = documents.length;
      apiOptions.paginate(documentsCounts)

    // Execute query
    const { mongooseQuery, paginationResult } = apiOptions;
     documents = await mongooseQuery.clone().exec();
    // const document = await mongooseQuery;


    res
      .status(200)
      .json({
         results: documents.length,
         documentsCounts,
          paginationResult,
           data: documents 
          });
  });