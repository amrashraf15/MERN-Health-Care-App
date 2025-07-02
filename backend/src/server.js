import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth-routes.js"
import adminRoutes from "./routes/admin-routes.js"
import doctorRoutes from "./routes/doctor-routes.js"

dotenv.config();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(cookieParser());
// routes
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/doctor',doctorRoutes)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});
// database password => KYLWx8RudKRFt4PS