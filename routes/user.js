const express = require('express');
const router = express.Router();

const { auth, setUserId, canAccess} = require('../middlewares/auth')


const {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  getUserValidator
} = require('../validations/userValidations');



const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  deactivateUser,
  login,
  register
} = require('../controllers/user');



router.post('/register', createUserValidator, register);
router.post('/login', loginValidator, login);


router.use(auth);
router.get('/user_data', setUserId, getUserValidator, getUser);
router.put('/update_profile', updateUserValidator, updateUserProfile);
router.put('/change_password', changeUserPasswordValidator, updateUserPassword);
router.put('/deactivate_user', deactivateUser)



router.use(canAccess(["admin"]));

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(getUserValidator, updateUserValidator, updateUser)
  .delete(getUserValidator, deleteUser);


router
  .route('/')
  .get(getUsers)
  .post(createUserValidator, createUser)



module.exports = router;
  