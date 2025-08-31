import express from "express";
import {
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getReportStats,
} from "../Controllers/admin.controller.js";

const router = express.Router();

// Get all reports for admin dashboard
router.get("/reports", getAllReports);

// Get report statistics
router.get("/stats", getReportStats);

// Get specific report by ID
router.get("/reports/:id", getReportById);

// Update report status
router.patch("/reports/:id/status", updateReportStatus);

// Delete report
router.delete("/reports/:id", deleteReport);

export default router;
