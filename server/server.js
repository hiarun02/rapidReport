import express from "express";
import "dotenv/config";
import {DbConnect} from "./utils/DBConnection.js";
import submitReport from "./routes/report.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT;

// apis

app.use("/api", submitReport);

app.listen(PORT, () => {
  console.log("Server listen at PORT : ", PORT);
  DbConnect();
});
