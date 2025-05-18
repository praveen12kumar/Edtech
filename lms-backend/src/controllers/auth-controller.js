import { UserService } from "../services/index.js";
import { NODE_ENV } from "../config/config.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

const userService = new UserService();

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    httpOnly: true,                  // Prevents client-side JS from accessing the cookie
    secure: NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "Lax"                  // Helps protect against CSRF
};

// ✅ Sign up a new user
// Steps:
// 1. Validate user input (username, email, password).
// 2. Check if the email already exists in the database (handled in service).
// 3. Hash the password using bcrypt (handled in service).
// 4. Upload the profile picture to Cloudinary (handled in service).
// 5. Save user details in the database.
// 6. Generate a JWT token and send it in a cookie.
export const signUp = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body;
    const localImagePath = req?.file?.path;

    if (!username || !email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const response = await userService.signup(username, email, password, localImagePath);

    res.cookie("token", response.token, cookieOptions);

    res.status(201).json({
        success: true,
        data: response.user,
        message: "User created successfully",
        err: {}
    });
});

// ✅ Log in an existing user
// Steps:
// 1. Validate user credentials (email & password).
// 2. Find the user by email in the database.
// 3. Compare passwords using bcrypt.compare().
// 4. Generate a JWT token if credentials are valid.
// 5. Store the token in a cookie and return user details.
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const response = await userService.signIn(email, password);

    res.cookie("token", response.token, cookieOptions);

    res.status(200).json({
        success: true,
        data: response.user,
        message: "User logged in successfully",
        err: {}
    });
});

// ✅ Log out the user
// Steps:
// 1. Clear the authentication cookie.
// 2. Return a success message.
export const logout = catchAsyncError(async (req, res,) => {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        data: {},
        message: "User logged out successfully",
        err: {}
    });
});

// ✅ Verify user email
// Steps:
// 1. Take the code from request body.
// 2. Call the service to validate and mark email as verified.
// 3. Return success or error response.
export const verifyEmail = catchAsyncError(async (req, res, next) => {
    const { code } = req.body;

    if (!code) {
        return next(new ErrorHandler("Verification code is required", 400));
    }

    const response = await userService.verifyUserEmail(code);

    res.status(200).json({
        success: true,
        data: response,
        message: "Email verified successfully",
        err: {}
    });
});
