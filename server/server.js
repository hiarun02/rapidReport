import express from "express";
import "dotenv/config";
import {DbConnect} from "./utils/DBConnection.js";
import submitReport from "./routes/report.route.js";
import adminRoutes from "./routes/admin.route.js";
import cors from "cors";
import multer from "multer";

const app = express();

const mode = process.env.MODE;

// CORS configuration
if (mode === "dev") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
} else if (mode === "prod") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

// Make uploads directory accessible
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT;

// apis
app.use("/api", submitReport);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log("Server listen at PORT : ", PORT);
  DbConnect();
});
