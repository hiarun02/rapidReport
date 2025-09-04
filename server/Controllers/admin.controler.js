import {Admin} from "../models/admin.model.js";

export const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;

    // 1. Check if fields are present
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }

    // 2. Find admin by email and password
    const admin = await Admin.findOne({email, password});
    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // 3. Set session
    req.session.adminId = admin._id;
    req.session.admin = {
      id: admin._id,
      email: admin.email,
    };

    // 4. Success response
    return res.status(200).json({
      message: "Admin login successful ✅",
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// logout

export const adminLogout = async (req, res) => {
  try {
    if (!req.session.adminId) {
      return res.status(400).json({
        message: "You are not logged in.",
        success: false,
      });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          message: "Logout failed.",
          success: false,
        });
      }

      res.clearCookie("connect.sid"); // ✅ Remove session cookie
      return res.status(200).json({
        message: "Admin logged out successfully ✅",
        success: true,
      });
    });
  } catch (error) {
    console.error("Error during admin logout:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
