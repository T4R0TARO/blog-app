const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const {
  register,
  login,
  profile,
  logout,
  createPost,
  getAllPost,
} = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/post", uploadMiddleware.single("file"), createPost);
router.get("/post", getAllPost);

module.exports = router;
