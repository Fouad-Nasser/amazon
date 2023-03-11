const Cart = require('../models/cart');
const factory = require('../utils/crudBuilder');




exports.getCarts = factory.getAll(Cart);

exports.getCart = factory.getOne(Cart);

exports.createCart = factory.createOne(Cart);

exports.deleteCart = factory.deleteOne(Cart);

exports.updateCart = factory.updateOne(Cart);
