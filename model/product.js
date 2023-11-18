const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    introProducts: {
      type: String,
    },
    see: {
      type: Number,
      default: 1,
    },
    desc: {
      type: Array,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    selled: {
      type: Number,
      default: 0,
    },
    img: {
      type: Array,
    },
    thumb: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
    },
    ratings: [
      {
        star: {
          type: Number,
        },
        voteBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
    variants: [
      {
        color: String,
        price: Number,
        thumb: String,
        images: Array,
        title: String,
        quatity: Number,
        id: String,
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
