import {Report} from "../models/report.model.js";

export const submitReport = async (req, res) => {
  try {
    const {reportId, reportType, incidentType, title, description, location} =
      req.body;

    // Handle uploaded file
    const imageFile = req.file ? req.file.filename : null;

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

    const newReport = await Report.create({
      reportId,
      reportType,
      incidentType,
      title,
      description,
      location,
      image: imageFile,
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
