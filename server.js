import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
// import cloudinary from "./config/cloudinary.js";

dotenv.config();

connectDB();


// cloudinary.api.ping((error, result) => {
//   if (error) {
//     console.error("Cloudinary Error:", error.message);
//   } else {
//     console.log("Cloudinary Connected:", result.status);
//   }
// });



const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);


app.get("/", (req, res) => {
  res.send("Real Estate API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});