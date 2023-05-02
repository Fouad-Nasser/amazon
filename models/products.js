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
        default:1
    },
    sales: {
        type: Number,
        default:0
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
    seller: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'user'
        }



}, { timestamps: true })
const productsModel = moongose.model('product', productsSchema)
module.exports = productsModel