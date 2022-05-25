const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const productSchema = mongoose.Schema({
  name: {
      type: String,
      trim: true,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  image_link: {
    main_image: {
      type: String,
    },
		sub_images: {
      type: Array,
    }
  },
  review: {
      type: Array,
  },
});

productSchema.pre('save', function (next) {
    const name = this.userName;
    if (name != "admin") {
        const err = "Not an admin";
        next(err);
    } else next();
});


const Product = mongoose.model("Product", productSchema, "products");

module.exports = { Product };
