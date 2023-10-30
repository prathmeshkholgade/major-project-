const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRediretUrl } = require("../middleware");
const userController =require("../controller/user");
const { renderloginform, login, logout } = require("../controller/user");

router.route("/signup")
.get(userController.signuprenderform )//sign up 
.post( wrapAsync(userController.signup))


router.route("/login")
.get( userController.renderloginform)
.post(saveRediretUrl,
passport.authenticate('local', {
    failureRedirect: "/login",
    failureFlash: true
}),userController.login);// login


//logout
router.get("/logout",userController.logout )

module.exports = router;

