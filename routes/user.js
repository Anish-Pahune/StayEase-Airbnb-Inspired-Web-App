const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, validateUser } = require("../middleware");

const userController = require("../controller/user");

router.route("/signup")
.get(userController.renderSignupForm)
.post(validateUser, wrapAsync (userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}), userController.login);

// Logout Route
router.get("/logout", userController.logout)

module.exports = router;