const UserModel = require("../models/User");
const Post = require("../models/Post");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  return res.status(200).json({ user: { username: user.username }, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Username...");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password...");
  }
  /** Error when implementing `createJWT()`
   * ! 'author' property  in response breaks
   */
  const token = await jwt.sign(
    { username, id: user._id },
    process.env.JWT_SECRET,
    {}
  );
  if (!token) {
    throw new Error("JWT sigining failed...");
  }
  res.cookie("token", token, { sameSite: "None", secure: true }).json({
    id: user.id,
    username,
  });
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
};

const logout = async (req, res) => {
  res
    .cookie("token", "", {
      sameSite: "None",
      secure: true,
    })
    .json("ok");
};

const createPost = async (req, res) => {
  // Reformat upload/image file name to include extention
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};

const editPost = async (req, res) => {
  res.json(req.file);
};

const getAllPost = async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

module.exports = {
  register,
  login,
  profile,
  logout,
  createPost,
  editPost,
  getAllPost,
  getSinglePost,
};
