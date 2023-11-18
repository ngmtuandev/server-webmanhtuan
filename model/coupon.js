const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    discout: {
      type: Number,
      require: true,
    },
    dayExpire: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
