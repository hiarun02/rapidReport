import express from "express";
import {
  adminGetAllReport,
  adminLogin,
  updateReportStatus,
  getReportById,
  Adminlogout,
  createAdmin,
} from "../Controllers/admin.controler.js";
import {deleteReport} from "../Controllers/report.controller.js";
import {isAuth} from "../Middlewares/isAuthenticated.js";

const router = express.Router();

// Public routes
router.post("/admin/create", createAdmin);
router.post("/admin/login", adminLogin);

// Protected routes
router.post("/admin/logout", isAuth, Adminlogout);
router.get("/admin/reports", isAuth, adminGetAllReport);
router.patch("/admin/reports/:reportId/status", isAuth, updateReportStatus);
router.get("/admin/reports/:reportId", isAuth, getReportById);
router.delete("/admin/reports/:id", isAuth, deleteReport);

export default router;
