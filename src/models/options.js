const { model, Schema } = require("mongoose");

const optionsSchema = Schema({
    amount: {
        type:Number,
        required:true
    },
    currency: {
        type: String,
        default:'INR'
    },
    receipt: { type: Schema.Types.ObjectId }, // receit generaton has to be thought off
  });

module.exports = model("Options", optionsSchema);