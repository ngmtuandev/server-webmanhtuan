const blogController = require("../controllers/blogController");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const configCloudinary = require("../config/cloudinaryConfig");
const router = express.Router();

router.post("/", [verifyToken, verifyAdmin], blogController.createBlog);
router.get("/blog-item/:id", blogController.getOneBlog);
router.get("/", blogController.getAllBlog);
router.put(
  "/upload-file/:id",
  [verifyToken, verifyAdmin],
  configCloudinary.single("image"),
  blogController.uploadFile
);
router.put("/like/:bid", [verifyToken], blogController.checkIsLike);
router.put("/dislike/:bid", [verifyToken], blogController.checkIsDisLike);
router.put("/:id", [verifyToken, verifyAdmin], blogController.updatedBlog);
router.delete("/:id", [verifyToken, verifyAdmin], blogController.updatedBlog);

module.exports = router;
