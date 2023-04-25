const CategoryModel = require('../models/Category')
const factory = require('../utils/crudBuilder');

const selectobj = (lang)=>{
    return{
        name:`$name_${lang}`,
        image:1
    }
}


exports.getCategorys = factory.getAll(CategoryModel, selectobj);

exports.getCategory = factory.getOne(CategoryModel, selectobj);

exports.createCategory = factory.createOne(CategoryModel);

exports.deleteCategory = factory.deleteOne(CategoryModel);

exports.updateCategory = factory.updateOne(CategoryModel);