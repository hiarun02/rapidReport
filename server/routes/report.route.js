import express from "express";
import {
  submitReport,
  findReportByReportId,
} from "../Controllers/report.controller.js";
import multer from "multer";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({storage: storage});

router.post("/submit-report", upload.single("imageFile"), submitReport);

router.get("/track-report/:reportId", findReportByReportId);

export default router;
