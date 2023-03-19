const express = require('express');
const router = express.Router();

const reviewsRoute = require('./review');
const { auth, canAccess } = require('../middlewares/auth')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');



router.get('/', getProducts);
router.use('/:productId/reviews', reviewsRoute);

router
  .route('/:id')
  .get(getProduct);


router.use(auth);

router.post('/', createProduct);
router
  .route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);




module.exports = router;
  