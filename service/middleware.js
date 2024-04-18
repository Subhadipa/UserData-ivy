const jwt = require("jsonwebtoken");
const responseCode = require("./responseCode").responseCode;
require("dotenv").config();
const tokenCheck = function (req, res, next) {
  try {
    let token = req.headers["authorization"];

    if (token) {
      let validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (validToken) {
        req.user = validToken.authorDetails;
        next();
      } else {
        return res
          .status(responseCode.badRequest)
          .send({ status: false, message: "Token not valid!" });
      }
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: false, message: "Mandatory header is missing!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};

module.exports = { tokenCheck };
