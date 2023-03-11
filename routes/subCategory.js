const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getSubCategorys,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require('../controllers/SubCategory');




router.use(auth);
router.post('/', createSubCategory);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);


router.get('/', getSubCategorys);


module.exports = router;
  