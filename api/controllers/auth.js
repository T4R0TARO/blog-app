const UserModel = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const register = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    const token = user.createJWT();
    return res.status(200).json({ user: { username: user.username }, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  return res.status(200).json({ user: { username: user.username } });
};

module.exports = {
  register,
  login,
};
