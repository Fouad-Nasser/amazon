const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/order');




router.use(auth);
router.post('/', createOrder);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);


router.get('/', getOrders);


module.exports = router;
  