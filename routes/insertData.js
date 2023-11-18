const insertDataToModel = require("../insertDataToModel");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post("/insert-product", insertDataToModel.insertDataProduct);
router.post("/insert-category", insertDataToModel.insertDataCategory);

module.exports = router;
