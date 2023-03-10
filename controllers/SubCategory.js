const SubCategoryModel = require('../models/SubCategory')
const factory = require('../utils/crudBuilder');


exports.getSubCategorys = factory.getAll(SubCategoryModel);

exports.getSubCategory = factory.getOne(SubCategoryModel);

exports.createSubCategory = factory.createOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);

exports.updateSubCategory = factory.updateOne(SubCategoryModel);