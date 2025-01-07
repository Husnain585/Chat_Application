const router = require("express").Router();
const {Signup, Login, Logout, updateProfile, checkAuth} = require("../Controller/auth.controller");
const { protectRoute } = require("../Middleware/auth.middleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update-profile", protectRoute ,updateProfile);
router.get("/check", protectRoute, checkAuth);
module.exports = router;