class ErrorHandler extends Error {
    constructor(
        message = "Something went wrong",
        statusCode,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = process.env.NODE_ENV === 'development' ? err.stack : undefined
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ErrorHandler;
