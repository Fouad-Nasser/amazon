const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        cartItems: [
          {
            productId: {
              type: mongoose.Schema.ObjectId,
              ref: 'Product',
            },
            quantity: {
              type: Number,
              default: 1,
            },
            image: String,
            name:String,
            color: String,
            price: Number,
            instock: Number,
          },
        ]     
    },
    { timestamps: true }
  );



  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;