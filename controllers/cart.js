const Cart = require('../models/cart');
const Product = require('../models/products');
const asyncHandler = require('express-async-handler');



exports.addProductToCart = asyncHandler(async (req, res) => {
    const { productId, color, name, image, quantity, instock, price } = req.body;
    const product = await Product.findById(productId);

    if(!product){
        res.status(401).json({ msg: 'Product Not Found'});
    }
    else{
        let cart = await Cart.findOne({ user: req.user.id });

        if(cart){
            const productIndex = cart.cartItems
            .findIndex(item => item.productId.toString() === productId );

            if(productIndex>-1){
                cart.cartItems[productIndex].quantity=quantity;
            }
            else{
                cart.cartItems.push({ productId, color, name, image, quantity, instock, price });
            }
            cart.save();

        }
        else{
            cart = await Cart.create({
                user: req.user.id,
                cartItems: [{ productId, color, name, image, quantity, instock, price }],
              });
        }

        res.status(200).json({
            msg: 'Product added to cart successfully',
            data: cart
          });
    }
  
  });
  


  exports.getUserCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
  
    if (cart) {
        res.status(200).json({ cart });
    }
    else{
        res.status(401).json({ msg: 'Cart Not Found'});
    }
      
  });


  exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body;
  
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        res.status(401).json({ msg: 'Cart Not Found'});
    }


    const productIndex = cart.cartItems
    .findIndex(item => item._id.toString() === req.params.itemId);

    if(productIndex>-1){
        cart.cartItems[productIndex].quantity = quantity;
    }
    else{
        res.status(401).json({ msg: 'there is no item for this id'});
    }
  
    cart.save();
  
    res.status(200).json({ cart });
    
  });


  exports.removeCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: { cartItems: { productId: req.params.itemId } },
      },
      { new: true }
    );
  
    res.status(200).json({
      status: 'success',
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  });


  exports.clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({msg:'cart deleted successfully'});
  });