const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

module.exports = {
  protectRoute: async (req, res, next) => {
    try {
      const token = res.cookies.jwt;
      if (!token) {
        res.status(401).json({ message: "Unauthorized - No Token Provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decode) {
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
      }
      const user = await User.findOne(decoded.userId).select("-password");
      if (!user) {
        res.status(401).json({ message: "User Not Foound" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log("Error in ProtectRoute Middleware", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
