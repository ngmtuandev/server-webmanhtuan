const blogCategoryController = require("../controllers/blogCategoryController");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post(
  "/create-blog",
  [verifyToken, verifyAdmin],
  blogCategoryController.createBlog
);
router.get("/blogs", blogCategoryController.getAllBlogs);
router.get("/:id", blogCategoryController.getOneBlog);
router.put(
  "/:id",
  [verifyToken, verifyAdmin],
  blogCategoryController.updateBlog
);
router.delete(
  "/:id",
  [verifyToken, verifyAdmin],
  blogCategoryController.deleteBlog
);

module.exports = router;
