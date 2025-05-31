import {CrudRepository} from "./index.js";
import Payment from "../models/payment.model.js";
import createrazorPayInstance from "../config/razorpay-config.js";


const razorpayInstance = createrazorPayInstance();


class PaymentRepository extends CrudRepository{

    constructor() {
        super(Payment);
    }


    async createOrder(data){
        try {
            const order = await razorpayInstance.orders.create(data);
            
            return order;
        } catch (error) {
            throw error;
        }
    }


}

export default PaymentRepository; 
