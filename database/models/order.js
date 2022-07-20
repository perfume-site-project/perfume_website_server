const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  email: {
      type: String,
      trim: true,
      required: true,
  },
  name: {
      type: String,
      trim: true,
      required: true,
  },
  receiver: {
      type: String,
      trim: true,
      required: true,
  },
  receiver_phone_number: {
      type: String,
      trim: true,
      required: true,
  },
  phone_number: {
      type: String,
      trim: true,
      required: true,
  },
  address: {
      type: String,
      trim: true,
      required: true,
  },
  message: {
      type: String,
      trim: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
