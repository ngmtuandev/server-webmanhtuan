const orderController = require("../controllers/orderController");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
// const uploadFile = require("../config/cloudinaryConfig");
const router = express.Router();

router.post("/create-order", [verifyToken], orderController.createOrder);
router.get("/order", [verifyToken], orderController.getUserOrder);
router.get(
  "/order-all",
  [verifyToken, verifyAdmin],
  orderController.getAllOrderbyAdmin
);
router.put("/:oid", [verifyToken], orderController.updateStatus);

module.exports = router;
