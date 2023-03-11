const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        totalPrice: {
                type: Number,
                required: true,
            },
        items: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
      ],
     
    },
    { timestamps: true }
  );



  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;