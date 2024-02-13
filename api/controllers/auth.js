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
  try {
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
    return res.status(200).json({ user: { username: user.username }, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  register,
  login,
};
