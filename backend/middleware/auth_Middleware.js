const jwt = require("jsonwebtoken");

function authMiddleware(secret_key) {
  return async function (req, res, next) {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secret_key, {
        issuer: "project-go",
        audience: "project-go-users",
      });
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
}

module.exports = { authMiddleware };
