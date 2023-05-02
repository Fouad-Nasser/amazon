const User = require('../models/user');
const Product = require('../models/products');
const Order = require('../models/order');
const asyncHandler = require('express-async-handler');


exports.statistics = asyncHandler(async (req, res, next) => {
    const clintNums = await User.find({role:'user'}).count();
    const sellerNums = await User.find({role:'seller'}).count();

    const productNums = await Product.find().count();
    const orderNums = await Order.find().count();
    const topProduct =  await Product.find().sort({ sales: -1 }).limit(3)
  
    res.status(200).json({ data: {
            clintNums,
            sellerNums,
            productNums,
            orderNums,
            topProduct
    } });
  });