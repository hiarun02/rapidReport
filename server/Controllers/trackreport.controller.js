import {Report} from "../models/report.model.js";
// track report
export const findReportByReportId = async (req, res) => {
  try {
    const {reportId} = req.params;

    if (!reportId) {
      return res.status(400).json({
        message: "Report ID is required.",
        success: false,
      });
    }

    const report = await Report.findOne({reportId: reportId});

    if (!report) {
      return res.status(404).json({
        message: "Report not found. Please check your Report ID and try again.",
        success: false,
      });
    }

    // Return limited information for public tracking (exclude sensitive admin data)
    const publicReportData = {
      reportId: report.reportId,
      reportType: report.reportType,
      incidentType: report.incidentType,
      title: report.title,
      description: report.description,
      location: report.location,
      status: report.status || "pending",
      priority:
        report.priority ||
        (report.reportType === "emergency" ? "high" : "medium"),
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
    };

    return res.status(200).json({
      message: "Report found successfully",
      success: true,
      data: publicReportData,
    });
  } catch (error) {
    console.error("Error finding report:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
