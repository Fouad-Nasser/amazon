const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');




router.use(auth);
router.post('/', createProduct);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);


router.get('/', getProducts);


module.exports = router;
  