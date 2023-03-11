const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart
} = require('../controllers/cart');




router.use(auth);
router.post('/', createCart);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getCart)
  .put(updateCart)
  .delete(deleteCart);


router.get('/', getCarts);


module.exports = router;
  