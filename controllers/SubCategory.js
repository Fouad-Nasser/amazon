const SubCategoryModel = require('../models/SubCategory')
const factory = require('../utils/crudBuilder');

const selectobj = (lang)=>{
    return{
        name:`$name_${lang}`,
        image:1
    }
}


exports.getSubCategorys = factory.getAll(SubCategoryModel, selectobj);

exports.getSubCategory = factory.getOne(SubCategoryModel, selectobj, 'category');

exports.createSubCategory = factory.createOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);

exports.updateSubCategory = factory.updateOne(SubCategoryModel);

exports.setFilterObj = (req, res, next) => {
    if (req.params.categoryId){
        req.filterObj = { category: req.params.categoryId }; 
    }
    next();
  };