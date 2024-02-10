const UserModel = require("../models/User");
// TODO: Custom Error Handlers
// TODO: Duplicates, Missing Username, Missing Password
// TODO: jwt, bcryptjs
const register = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    return res.status(200).json({ user: { name: user.username } });
  } catch (error) {
    console.log(error);
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
