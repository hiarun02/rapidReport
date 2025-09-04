import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import {DbConnect} from "./utils/DBConnection.js";
import reportRoute from "./routes/report.route.js";
import adminRoutes from "./routes/admin.route.js";
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_String, // Your MongoDB URI
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // ❌ set true only in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

const PORT = process.env.PORT;

// apis

app.use("/api", reportRoute);
app.use("/api", adminRoutes);

app.listen(PORT, () => {
  console.log("Server listen at PORT : ", PORT);
  DbConnect();
});
