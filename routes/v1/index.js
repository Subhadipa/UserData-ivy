let express = require("express");
let router = express.Router();
const userAuthController = require("../../controller/auth/user");
const userController = require("../../controller/user/user");

// const middleware = require("../../service/middleware").tokenCheck;

router.post("/user", userAuthController.registerUser);
router.get("/user", userController.getAllUsers);
router.get("/user/:userId", userController.getUser);
router.put("/user/:userId", userController.updateUser);
router.delete("/user/:userId", userController.deleteUser);
module.exports = router;
