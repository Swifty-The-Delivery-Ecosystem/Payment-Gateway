const { model, Schema } = require("mongoose");

const PaymentDetailsSchema = Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

  module.exports = model("PaymentDetails", PaymentDetailsSchema);