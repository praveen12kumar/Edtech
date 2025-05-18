import { logger } from "../utils/logger.js"; // Make sure this path is correct

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    logger.error(`${req.method} ${req.url} - ${statusCode} - ${message}`);
    logger.error(err.stack);

    res.status(statusCode).json({
        success: false,
        data: null,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};
