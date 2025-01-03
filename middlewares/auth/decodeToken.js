const jwt = require("jsonwebtoken");

/**
 * NOTE: This middleware for decoding JWT is not necessary when using Passport's JWT strategy.
 * Passport handles token decoding and user extraction automatically.
 */

const decodeToken = (req, res, next) => {
  console.log("header");
  
  const authHeader = req.headers.authorization;
  // console.log("req.headers.authorization", req.headers);
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    req.code = decoded?.code;
    console.log("hii", req.userId);
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = decodeToken;
