import {Report} from "../models/report.model.js";

// Get all reports for admin dashboard
export const getAllReports = async (req, res) => {
  try {
    const {status, priority, reportType, page = 1, limit = 50} = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (reportType) filter.reportType = reportType;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get reports with pagination and sorting
    const reports = await Report.find(filter)
      .sort({createdAt: -1})
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalReports = await Report.countDocuments(filter);

    // Add status and priority to existing reports if they don't have them
    const reportsWithDefaults = reports.map((report) => ({
      ...report.toObject(),
      status: report.status || "pending",
      priority:
        report.priority ||
        (report.reportType === "emergency" ? "high" : "medium"),
    }));

    return res.status(200).json({
      success: true,
      data: reportsWithDefaults,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReports / limit),
        totalReports,
        hasNext: skip + reports.length < totalReports,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

// Get report statistics
export const getReportStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({status: "pending"});
    const inProgressReports = await Report.countDocuments({
      status: "in-progress",
    });
    const resolvedReports = await Report.countDocuments({status: "resolved"});
    const emergencyReports = await Report.countDocuments({
      reportType: "emergency",
    });

    // Get reports from last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentReports = await Report.countDocuments({
      createdAt: {$gte: last24Hours},
    });

    return res.status(200).json({
      success: true,
      data: {
        total: totalReports,
        pending: pendingReports,
        inProgress: inProgressReports,
        resolved: resolvedReports,
        emergency: emergencyReports,
        recent24h: recentReports,
      },
    });
  } catch (error) {
    console.error("Error fetching report stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report statistics",
      error: error.message,
    });
  }
};

// Get specific report by ID
export const getReportById = async (req, res) => {
  try {
    const {id} = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Add defaults if missing
    const reportWithDefaults = {
      ...report.toObject(),
      status: report.status || "pending",
      priority:
        report.priority ||
        (report.reportType === "emergency" ? "high" : "medium"),
    };

    return res.status(200).json({
      success: true,
      data: reportWithDefaults,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
      error: error.message,
    });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {status, priority} = req.body;

    // Validate status
    const validStatuses = ["pending", "in-progress", "resolved", "closed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: " + validStatuses.join(", "),
      });
    }

    // Validate priority
    const validPriorities = ["low", "medium", "high", "critical"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid priority. Must be one of: " + validPriorities.join(", "),
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    updateData.updatedAt = new Date();

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update report",
      error: error.message,
    });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const {id} = req.params;

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete report",
      error: error.message,
    });
  }
};
