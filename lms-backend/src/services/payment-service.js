import { PaymentRepository } from "../repository/index.js";
import { UserRepository } from "../repository/index.js";
import { CourseRepository } from "../repository/index.js";

import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";
import crypto from "crypto";

import createrazorPayInstance from '../config/razorpay-config.js';

const razorpayInstance = createrazorPayInstance();

class PaymentService {
  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.userRepository = new UserRepository();
    this.courseRepository = new CourseRepository();
  }

  async getRazorpayApiKey() {
    const response = process.env.RAZORPAY_KEY_ID;
    return response;
  }

  async buyCourse(userId, courseId) {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        throw new ErrorHandler("Unauthorized, please login again", 404);
      }

      if (user.role === "ADMIN") {
        throw new ErrorHandler("ADMIN cannot purchase a subscription", 400);
      }

      const course = await this.courseRepository.findCourseById(courseId);

      if (!course) {
        throw new ErrorHandler("Course not found", 404);
      }

      const priceAfterDiscount = Math.round(
        course.price - (course.price * course.discount) / 100
      );

      const options = {
        amount: priceAfterDiscount * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        payment_capture: 1,
        notes:{
            courseId,
            userId,
        }
      };

      const order = await this.paymentRepository.createOrder(options);

      return order;
    } catch (error) {
      console.log("error", error);
      throw new ErrorHandler(error.message || "Internal Server Error", 500);
    }
  }

  async verifyCourse(
    userId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new ErrorHandler("Unauthorized, please login again", 404);
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new ErrorHandler("Payment not verified, please try again", 500);
    }

    await this.paymentRepository.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_order_id,
    });

    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    const courseId = order.notes.courseId;

    const course = await this.courseRepository.findCourseById(courseId);

    if (!course) {
      throw new ErrorHandler("Course not found", 404);
    }

    // Enroll user if not already enrolled
   if(!user.courses.includes(courseId)){
       user.courses.push(courseId);
       await user.save();
   }
   else{
       throw new ErrorHandler("You are already enrolled in this course", 400);
   }

    user.payment.id = razorpay_payment_id;
    user.payment.status = "active";
    await user.save();

    return user;
  }
}

export default PaymentService;
