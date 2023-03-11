const express = require('express');
const router = express.Router();

const { auth, userProtect } = require('../middlewares/auth')

const {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/Category');




router.use(auth);
router.post('/', createCategory);


// router.use('/:id', userProtect);
router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);


router.get('/', getCategorys);


module.exports = router;
  