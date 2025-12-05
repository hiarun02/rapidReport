import {Admin} from "../models/admin.model.js";
import {Report} from "../models/report.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/jwt-Utility-Fun.js";

// Create new admin
export const createAdmin = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({email: email.toLowerCase()});
    if (existingAdmin) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newAdmin._id, newAdmin.email);

    return res.status(201).json({
      message: "Admin created successfully",
      success: true,
      data: {
        admin: {
          _id: newAdmin._id,
          email: newAdmin.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const {email, password} = req?.body;

    // 1. Check if fields are present
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }
    // Find admin by email
    const admin = await Admin.findOne({email: email.toLowerCase()});

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
        errors: {auth: "Email or password is incorrect"},
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
        errors: {auth: "Email or password is incorrect"},
      });
    }

    const token = generateToken(admin._id, admin.email);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        admin: {
          _id: admin._id,
          email: admin.email,
        },
        token: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const Adminlogout = (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};

export const adminGetAllReport = async (req, res) => {
  try {
    const reports = await Report.find().sort({createdAt: -1});

    // Add default values for missing fields
    const formattedReports = reports.map((report) => ({
      ...report.toObject(),
      status: report.status || "pending",
      priority:
        report.priority ||
        (report.reportType === "emergency" ? "high" : "medium"),
    }));

    return res.status(200).json({
      success: true,
      data: formattedReports,
      message: "Reports fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const {reportId} = req.params;
    const {status} = req.body;

    if (!reportId || !status) {
      return res.status(400).json({
        message: "Report ID and status are required.",
        success: false,
      });
    }

    const validStatuses = ["pending", "in-progress", "resolved", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be one of: " + validStatuses.join(", "),
        success: false,
      });
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      {status, updatedAt: new Date()},
      {new: true}
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update report status",
    });
  }
};

// Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const {reportId} = req.params;

    if (!reportId) {
      return res.status(400).json({
        message: "Report ID is required.",
        success: false,
      });
    }

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "Report not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
      message: "Report fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
};
