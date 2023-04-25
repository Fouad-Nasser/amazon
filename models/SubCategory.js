var mongoose = require('mongoose');

var SunCategorySchema = mongoose.Schema({
    name_en: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name_ar: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category',
        required: true
    }
}, { timestamps: true })

const CategoryModel = mongoose.model('SubCategory', SunCategorySchema)
module.exports = CategoryModel