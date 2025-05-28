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

export default router;



// 🚀 What To Do Next (Recommended Roadmap)
// 1. Course and Topic Retrieval (Public & Authenticated Users)

// GET /courses – List all available courses -> done

// GET /course/:id – Get course details, including topics -> done

// GET /topic/:id – Get topic details (you may add lectures inside later)

// 🔒 These should be public or authenticated endpoints (not admin-only).

// 2. Add Lecture Support (Admin Only)
// Define a Lecture model: title, video URL, notes, topic reference

// POST /lecture/create – Add lecture to a topic

// PUT /lecture/:id – Update lecture

// DELETE /lecture/:id – Delete lecture

// GET /lecture/:id – View single lecture (optional)

// These should be admin-only routes.

// 3. Course Enrollment for Students
// POST /course/enroll/:courseId – Enroll authenticated student

// Track enrolled courses per user in DB

// Prevent multiple enrollments

// Add GET /user/enrollments – Fetch student’s enrolled courses

// 4. Progress Tracking (Optional for Later)
// Track which topics or lectures the student has completed

// Save progress in a UserCourseProgress collection/table

// 5. Search and Filter Courses (Optional UI Enhancement)
// GET /courses?keyword=javascript&level=beginner

// Filtering by difficulty, tags, popularity, etc.

// 6. Add Admin CRUD for All Models
// GET /admin/courses

// PUT /course/:id

// DELETE /course/:id

// Same for Topics and Lectures