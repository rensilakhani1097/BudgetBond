const express = require('express');
const router = express.Router();
const { createUser ,updateUser,
  GetUser,ActiveUser,InactiveUser,GetAllUser,successGoogleLogin,failureGoogleLogin
} = require("../controller/userController");

router.route("/").get(GetAllUser);
router.route("/:id").put(updateUser).get(GetUser);
router.route("/create").post(createUser);
router.route("/:id/status/active").get(ActiveUser);
router.route("/:id/status/inactive").get(InactiveUser);


module.exports = router;


