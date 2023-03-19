const express = require('express');
const router = express.Router();

const { auth, canAccess } = require('../middlewares/auth')

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj
} = require('../controllers/review');



router.get('/', createFilterObj, getReviews);


router.use(auth);
router.post('/', createReview);

router
  .route('/:id')
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);


module.exports = router;
  