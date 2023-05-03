const User = require('../models/user');
const Product = require('../models/products');
const Order = require('../models/order');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');


exports.statistics = asyncHandler(async (req, res, next) => {
    const clintNums = await User.find({role:'user'}).count();
    const catNums = await Category.find().count();

    const productNums = await Product.find().count();
    const orderNums = await Order.find().count();
    const topProduct =  await Product.find().select('name_en ratings').sort({ratings: -1}).limit(3)
  
    res.status(200).json({ data: {
            clintNums,
            catNums,
            productNums,
            orderNums,
            topProduct
    } });
  });