const brandControlller = require("../controllers/brandControlller");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post(
  "/create-brand",
  [verifyToken, verifyAdmin],
  brandControlller.createBrand
);
router.get("/brand", brandControlller.getAllBrand);
router.get("/:id", brandControlller.getOneBrand);
router.put("/:id", [verifyToken, verifyAdmin], brandControlller.updateBrand);
router.delete("/:id", [verifyToken, verifyAdmin], brandControlller.deleteBrand);

module.exports = router;
