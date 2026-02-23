require("dotenv").config();
const { verifyToken } = require("@clerk/backend");

const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Clerk token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.clerkUserId = payload.sub;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Clerk token",
      error: err.message,
    });
  }
};

module.exports = { verifyClerkToken };