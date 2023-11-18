const productController = require("../controllers/productController");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const uploadFile = require("../config/cloudinaryConfig");
const router = express.Router();

router.post(
  "/create-product",
  [verifyToken, verifyAdmin],
  productController.createProduct
);

router.get("/all-product", productController.getAllProducts);
router.put(
  "/uploadImage/:id",
  [verifyToken, verifyAdmin],
  uploadFile.array("image", 10),
  productController.uploadFileProduct
);
router.put(
  "/add-variant/:pid",
  [verifyToken, verifyAdmin],
  uploadFile.array("image", 10),
  productController.addVariantProduct
);
router.put("/ratings", [verifyToken], productController.ratingProduct);
router.get("/:id", productController.getOneProduct);
router.put("/:id", [verifyToken, verifyAdmin], productController.updateProduct);
router.delete(
  "/:id",
  [verifyToken, verifyAdmin],
  productController.deleteProduct
);

module.exports = router;
