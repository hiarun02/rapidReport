import express from "express";
import {
  findReportByReportId,
  submitReport,
} from "../Controllers/report.controller.js";
import {multerUpload} from "../utils/multer.js";

const router = express.Router();

router.post("/submit-report", multerUpload, submitReport);

router.get("/track-report/:reportId", findReportByReportId);

export default router;
