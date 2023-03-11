const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review');




router.use(auth);
router.post('/', createReview);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);


router.get('/', getReviews);


module.exports = router;
  