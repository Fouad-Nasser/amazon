const express = require('express');
const router = express.Router();

const { auth, setUserId, canAccess} = require('../middlewares/auth')


const {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  getUserValidator,
  forgotPasswordValidator
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
  register,
  verifyEmail,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  userData
} = require('../controllers/user');



router.post('/register', createUserValidator, register);
router.post('/verify_email', verifyEmail);
router.post('/login', loginValidator, login);
router.post('/forgot_password', forgotPassword);
router.post('/verify_reset_code', verifyResetCode);
router.put('/reset_password', forgotPasswordValidator, resetPassword);




router.use(auth);
router.get('/user_data', userData);
router.put('/update_profile', updateUserValidator, updateUserProfile);
router.put('/change_password', changeUserPasswordValidator, updateUserPassword);
router.delete('/deactivate_user', deactivateUser);



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
  