const express = require('express');
const { signup,signin } = require('../controllers/auth');

// import  validator
const { userSignupValidator,userSigninValidator} = require('../validations/index');


const router = express.Router();

router.post('/signup',userSignupValidator, signup);
router.post('/signin', userSigninValidator, signin);
// router.get('/signout', signout);




module.exports = router;
