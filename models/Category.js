var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel