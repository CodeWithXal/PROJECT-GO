const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check token exists and bearer format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Clerk token missing",
      });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    const session = await clerk.sessions.verifySessionToken(token);

    if (!session?.userId) {
      return res.status(401).json({
        message: "Invalid session",
      });
    }
    
    req.clerkUserId = session.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Clerk token",
      error: err.message,
    });
  }
};

module.exports = {verifyClerkToken};