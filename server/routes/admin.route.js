import express from "express";
import {adminLogin, adminLogout} from "../Controllers/admin.controler.js";
import {verifyAdmin} from "../Middlewares/adminMiddleweare.js";

const router = express.Router();

router.post("/admin-login", adminLogin);
router.post("/admin-logout", verifyAdmin, adminLogout);

router.get("/admin/dashboard", verifyAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin Dashboard 🎉",
    admin: req.session.admin,
  });
});

export default router;
