import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        required: true,
        unique: true

    },
    razorpay_order_id: {
        type: String,
        required: true,     // 🔄 Made optional
        default: null        // 🔄 Default value to avoid undefined issues
    },
    razorpay_signature: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Payment = model('Payment', paymentSchema);
export default Payment;
