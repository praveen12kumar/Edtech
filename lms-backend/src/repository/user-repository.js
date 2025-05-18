import { CrudRepository } from "./index.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js"; // Import logger

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        try {
            const result = await User.findOne({ email }).select("+password");
            return result;
        } catch (error) {
            logger.error(`Error finding user by email: ${email} - ${error.message}`);
            throw new ErrorHandler("User not found", 404);
        }
    }

    async findUserByToken(token) {
        try {
            const result = await User.findOne({ verifyPasswordOTP: token });
            return result;
        } catch (error) {
            logger.error(`Error finding user by token: ${token} - ${error.message}`);
            throw error;
        }
    }
}

export default UserRepository;
