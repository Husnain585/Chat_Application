const router = require("express").Router();
const { getUserForSidebar, getMessages, sendMessage } = require("../Controller/message.Controller");
const { protectRoute } = require("../Middleware/auth.middleware");

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;