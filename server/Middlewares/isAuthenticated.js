import {verifyToken} from "../utils/jwt-Utility-Fun.js";

export const isAuth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
        errors: {auth: "Authorization token is required"},
      });
    }

    const decoded = verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    if (error.message === "Token has expired") {
      return res.status(401).json({
        message: "Token has expired",
        success: false,
        errors: {auth: "Please login again"},
      });
    }

    if (error.message === "Invalid token") {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
        errors: {auth: "Invalid authorization token"},
      });
    }

    return res.status(403).json({
      message: "Authentication failed",
      success: false,
      errors: {auth: error.message},
    });
  }
};
