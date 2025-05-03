import {CrudRepository} from "./index.js";
import User from "../models/user.model.js";

class UserRepository extends CrudRepository{

    constructor(){
        super(User);
    }

    async findByEmail(email) {
        
        try {
            const result = await User.findOne({email}).select("+password");
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findUserByToken(token){
        //console.log("token", token);
        try {
            const result = await User.findOne({verifyPasswordOTP: token});
            //console.log("result", result);
            return result;
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }


}

export default UserRepository;