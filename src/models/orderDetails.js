const { model, Schema } = require("mongoose");


const PaymentDetailsSchema = Schema({
    razorpayDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    success: Boolean,
  });

  module.exports = model("PaymentDetails", PaymentDetailsSchema);