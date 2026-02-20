const jwt = require("jsonwebtoken");
//const jwt_secret = process.env.JWT_AUTH_SECRET;

function authMiddleware(secret_key) {
  return function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Token Missing",
      });
    }

    try {
      const decoded = jwt.verify(token, secret_key);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  };
}

module.exports = { authMiddleware };
