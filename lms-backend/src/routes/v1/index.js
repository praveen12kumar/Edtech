import express from 'express';
import {upload} from "../../middlewares/multer-middleware.js";


// auth
import { 
    signUp,
    signIn,
    logout,
    verifyEmail

} from '../../controllers/auth-controller.js';

// user
import {
    getProfile,
    changePassword,
    forgotPassword,
    resetPassword

} from "../../controllers/user-controller.js";



import {authenticate} from "../../middlewares/authenticate.js";


const router = express.Router();


// auth

router.post('/user/signup', upload.single("avatar"),  signUp);
router.post('/user/signin', signIn);
router.post('/user/logout', logout);
router.post('/user/verify-email', verifyEmail);


// user

router.get('/user/me', authenticate, getProfile);
router.post('/user/change-password', authenticate, changePassword);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/reset-password', resetPassword);


export default router;