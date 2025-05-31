import express from 'express';
import {upload} from "../../middlewares/multer-middleware.js";
import { authorizeAdmin } from '../../middlewares/authorizeAdmin.js';

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


// course
import { 
    createCourse,
    getAllCourses,
    getCourseDetails,
    updateCourse,
    deleteCourse

} from '../../controllers/course-controller.js';


// Topic

import {
    createTopic,
    updateTopic,
    deleteTopic

} from "../../controllers/topic-controller.js";


// Lectures

import {
    addLecture,
    getLectureDetails,
    deleteLecture,
    updateLecture
} from "../../controllers/Lecture-controller.js";


// Payments

import {getRazorpayApiKey, buyCourse, verifyCourse} from '../../controllers/payment-controller.js';


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


// course

router.post('/course/create', authenticate, authorizeAdmin, upload.single("thumbnail"), createCourse);
router.get('/courses', getAllCourses);
router.get('/course/:id/details', getCourseDetails);
router.put('/course/:id/update', authenticate, authorizeAdmin, upload.single("thumbnail"), updateCourse);
router.delete('/course/:id', authenticate, authorizeAdmin, deleteCourse);


// Topic

router.post('/topic/create', authenticate, authorizeAdmin, createTopic);
router.put('/topic/:id', authenticate, authorizeAdmin, updateTopic);
router.delete('/topic/:id', authenticate, authorizeAdmin, deleteTopic);

// Lectures

router.post('/lecture/create', authenticate, authorizeAdmin, upload.single("video"), addLecture);
router.get('/lecture/:id', authenticate, getLectureDetails);
router.delete('/lecture/:id', authenticate, authorizeAdmin, deleteLecture);
router.put('/lecture/:id', authenticate, authorizeAdmin, upload.single("video"), updateLecture);


// Payments

router.post('/course/purchase', authenticate, buyCourse);
router.get('/razorpay-key', authenticate, getRazorpayApiKey);
router.post('/payments/verify', authenticate, verifyCourse);


export default router;

