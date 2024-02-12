const UserModel = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const register = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    return res.status(200).json({ user: { name: user.username } });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  return res.status(200).send("login testing...");
};

module.exports = {
  register,
  login,
};
