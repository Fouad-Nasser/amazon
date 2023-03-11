const express = require('express');
const router = express.Router();

const { auth, userProtect, canAccess} = require('../middlewares/auth')

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  login
} = require('../controllers/user');



router.post('/', createUser);
router.post('/login', login);


// router.use(auth);
// router.use('/:id', userProtect);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.put('/changePassword/:id', updateUserPassword);

router.get('/', getUsers);


module.exports = router;
  