import jwt from "jsonwebtoken";

// Generate JWT Token
export const generateToken = (adminId, email) => {
  const token = jwt.sign(
    {
      id: adminId,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
  return token;
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw error;
  }
};

// Decode Token without verification (for debugging)
export const decodeToken = (token) => {
  return jwt.decode(token);
};
