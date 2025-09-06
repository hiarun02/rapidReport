import {Report} from "../models/report.model.js";
import cloudinary from "../utils/CloudinaryConfig.js";
import getDataUri from "../utils/dataUri.js";

export const submitReport = async (req, res) => {
  try {
    const {reportId, reportType, incidentType, title, description, location} =
      req.body;

    if (
      !reportId ||
      !reportType ||
      !incidentType ||
      !title ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    //
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({message: "Image file is required.", success: false});
    }

    //Convert buffer to Base64 for Cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const newReport = await Report.create({
      reportId,
      reportType,
      incidentType,
      title,
      description,
      location,
      image: cloudResponse.secure_url,
    });

    return res.status(201).json({
      reportId: newReport.reportId,
      message: "Report submitted successfully ✅",
      success: true,
    });
  } catch (error) {
    console.error("Error submitting report:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

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
