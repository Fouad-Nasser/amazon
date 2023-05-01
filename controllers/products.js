const Product = require('../models/products');
const factory = require('../utils/crudBuilder');


const selectobj = (lang)=>{
    return{
        name:`$name_${lang}`,
        description:`$description_${lang}`,
        images:1,
        price:1,
        ratings:1,
        brand:1,
        instock:1,
        categoryID:1,
        subCategoryID:1,
        saller:1
    }
}


exports.getProducts = factory.getAll(Product, selectobj, { path: 'categoryID', select: {name:"$name"} },'Products');

exports.getProduct = factory.getOne(Product, selectobj);

exports.createProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.updateProduct = factory.updateOne(Product);
