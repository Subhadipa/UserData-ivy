const responseCode = require("../../service/responseCode").responseCode;
const mongoose = require("mongoose");
const userModel = require("../../models/user");

const getAllUsers = async (req, res) => {
  try {
    let userDetails = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $project: {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    if (userDetails.length > 0) {
      return res.status(responseCode.success).send({
        status: "true",
        message: "All users fetched successfully!",
        data: userDetails,
      });
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: "false", message: "Can't fetch users!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    let userDetails = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.userId),
          isDeleted: false,
        },
      },
      {
        $project: {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    if (userDetails.length > 0) {
      return res.status(responseCode.success).send({
        status: "true",
        message: "User fetched successfully!",
        data: userDetails[0],
      });
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: "false", message: "Can't fetch user!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let userDetails = await userModel.findOneAndUpdate(
      {
        _id: req.params.userId,
        isDeleted: false,
      },
      { $set: { ...req.body } },
      { new: true }
    );
    if (userDetails) {
      return res.status(responseCode.success).send({
        status: "true",
        message: "User updated successfully!",
        data: userDetails,
      });
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: "false", message: "Can't update user!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    let userDetails = await userModel.findOneAndUpdate(
      {
        _id: req.params.userId,
        isDeleted: false,
      },
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (userDetails) {
      return res.status(responseCode.success).send({
        status: "true",
        message: "User deleted successfully!",
        data: userDetails,
      });
    } else {
      return res
        .status(responseCode.badRequest)
        .send({ status: "false", message: "Can't delete user!" });
    }
  } catch (error) {
    return res
      .status(responseCode.serverError)
      .send({ status: "Failed", message: error.message });
  }
};
module.exports = { getAllUsers, getUser, updateUser, deleteUser };
