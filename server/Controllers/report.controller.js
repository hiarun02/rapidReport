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
