const router = require("express").Router();
const {Signup, Login, Logout} = require("../Controller/auth.controller");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;