const userController = require("../controllers/userAuth");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();
const uploadFile = require("../config/cloudinaryConfig");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", verifyToken, userController.getUser);
router.get("/completed/:token", userController.completedRegister);
router.put("/address", verifyToken, userController.updateAddress);
router.post("/refreshAccessToken", userController.refreshAccessTokenUser);
router.get("/users", [verifyToken, verifyAdmin], userController.getAllUsers);
router.delete("/cart", [verifyToken], userController.deleteCart);
router.put("/cart/:pid", [verifyToken], userController.cartUser);
router.delete("/:id", [verifyToken, verifyAdmin], userController.deleteUser);
router.put(
  "/update",
  uploadFile.array("image", 10),
  [verifyToken],
  userController.updateUser
);

module.exports = router;
