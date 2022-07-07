const mongoose = require("mongoose");

const basketSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Basket = mongoose.model("Basket", basketSchema);
module.exports = { Basket };
