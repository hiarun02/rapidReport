import express from "express";
import "dotenv/config";
import {DbConnect} from "./utils/DBConnection.js";
import submitReport from "./routes/report.route.js";
import cors from "cors";

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
const PORT = process.env.PORT;

// apis

app.use("/api", submitReport);

app.listen(PORT, () => {
  console.log("Server listen at PORT : ", PORT);
  DbConnect();
});
