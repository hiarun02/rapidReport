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

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_String,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
