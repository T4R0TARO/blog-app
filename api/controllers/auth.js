const UserModel = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

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
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  return res
    .cookie("token", token, {
      sameSite: "None",
      secure: true,
      // Partitioned,
    })
    .json({
      id: user._id,
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
      // Partitioned,
    })
    .json("ok");
};

module.exports = {
  register,
  login,
  profile,
  logout,
};
