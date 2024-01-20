const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name."],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price."],
    maxlength: [5, "Product name cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description."],
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Clothing",
        "Footwear",
        "Home and Kitchen",
        "Books",
        "Sports and Outdoors",
        "Beauty and Personal Care",
        "Toys and Games",
        "Health and Wellness",
        "Automotive",
        "Bicycles",
        "Computers",
        "Wearables",
      ],
      message: "Please select correct category for this product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller."],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock."],
    maxlength: [5, "Product stock cannot exceed 5."],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  review: [
    {
      name: {
        type: String,
        requried: true,
      },
      rating: {
        type: Number,
        requried: true,
      },
      comment: {
        type: String,
        requried: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
