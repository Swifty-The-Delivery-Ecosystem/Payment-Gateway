const PaymentDetails = require("../models/orderDetails");
const Razorpay = require('razorpay');

exports.order = async(req,res,next) => {
    try {

        const {amount} = req.body;
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID, // RAZORPAY KEY
          key_secret: process.env.RAZORPAY_SECRET, // RAZORPAY SECRET
        });

        const options = {
          amount,
          currency: 'INR',
          // receipt: shortid.generate(), // receit generaton has to be thought off
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send('Some error occured');
    
        res.json(order);
      } catch (error) {
        res.status(500).send(error);
      }
}

exports.success = async(req,res,next) => {
    try {
        const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        } = req.body;
    
        const shasum = crypto.createHmac('sha256', '<RAZORPAY SECRET>'); //SHA-256 hash 
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');
    
        if (digest !== razorpaySignature)
          return res.status(400).json({ msg: 'Transaction not legit!' });
    
        const newPayment = PaymentDetails({
          razorpayDetails: {
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            signature: razorpaySignature,
          },
          success: true,
        });
    
        await newPayment.save();
    
        res.json({
          msg: 'success',
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
        });
      } catch (error) {
        res.status(500).send(error);
      }
}

exports.refund = async(req,res,next) => {
  try {

    //Verify the payment Id first, then access the Razorpay API.

    const options = {

        payment_id: req.body.paymentId,

        amount: req.body.amount,

    };

const razorpayResponse = await razorpay.refund(options);

    //We can send the response and store information in a database

    res.send('Successfully refunded')

} catch (error) {

    console.log(error);

    res.status(400).send('unable to issue a refund');

}
}