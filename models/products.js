const moongose = require('mongoose')

const productsSchema = moongose.Schema({

    name_en: {
        type: String,
        required: true,
        trim: true
    },
    name_ar: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'products must have a price'],
        maxLength: 1000000,
        minLength: 1

    },
    description_en: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    description_ar: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    brand: {
        type: String,
        required: [true, 'Please select category for this product'],
    },
    instock: {
        type: Number,
        required: [true, 'Please enter product stock'],
    },
    discount: {
        type: Number,
    },
    categoryID: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'category',
        required:true
    },
    subCategoryID: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'subCategory',
        required:true
    },
    saller: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'user',
        required:true
    }



}, { timestamps: true })
const productsModel = moongose.model('product', productsSchema)
module.exports = productsModel