const category = require("../controllers/category");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post(
  "/create-category",
  [verifyToken, verifyAdmin],
  category.createCategory
);

router.put("/:id", [verifyToken, verifyAdmin], category.updateCategory);

router.get("/", category.getCategorys);

router.delete("/:id", [verifyToken, verifyAdmin], category.deleteCategory);

module.exports = router;
