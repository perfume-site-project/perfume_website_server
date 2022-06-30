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
  ingredient_description: {
      type: String,
  },
  tasting_note: {
      type: String,
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

productSchema.statics.findByName = (name) => {
  let product = this;
  product.findOne({name: name}, (err, product) => {
    console.log(product);
  });
}

const Product = mongoose.model("Product", productSchema, "products");

module.exports = { Product };
