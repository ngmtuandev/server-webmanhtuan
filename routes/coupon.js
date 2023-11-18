const couponController = require("../controllers/couponController");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post(
  "/create-coupon",
  [verifyToken, verifyAdmin],
  couponController.createCoupon
);
router.get("/coupons", couponController.getAllCoupons);
router.get("/:id", couponController.getOneCoupon);
router.put("/:id", [verifyToken, verifyAdmin], couponController.updateCoupon);
router.delete(
  "/:id",
  [verifyToken, verifyAdmin],
  couponController.deleteCoupon
);

module.exports = router;
