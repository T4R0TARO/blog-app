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
  editPost,
  deletePost,
  getAllPost,
  getSinglePost,
} = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/post", uploadMiddleware.single("file"), createPost);
router.get("/post", getAllPost);
router.get("/post/:id", getSinglePost);
router.put("/post", uploadMiddleware.single("file"), editPost);
router.get("/delete/id", deletePost);

module.exports = router;
