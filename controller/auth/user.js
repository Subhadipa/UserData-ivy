const responseCode = require("../../service/responseCode").responseCode;
const userModel = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(userData) {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY);
}
const registerUser = async (req, res) => {
  try {
    let emailCheck = await userModel.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (emailCheck !== null) {
      return res.status(responseCode.badRequest).send({
        status: "false",
        message: "You are already registered with this email!",
      });
    }
    let userDetails = await userModel.create(req.body);
    if (userDetails) {
      const newToken = generateToken({ userDetails });
      let userData = await userModel.findOneAndUpdate(
        { _id: userDetails._id, isDeleted: false },
        { $set: { token: newToken } },
        { new: true }
      );
      return res.status(responseCode.success).send({
        status: "false",
        message: "You are registered successfully!",
        data: userData,
      });
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: "false", message: "Can't register the user!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};

module.exports = { registerUser };
