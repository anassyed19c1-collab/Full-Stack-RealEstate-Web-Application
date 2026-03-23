import express from "express";
import {
  getAllProperties,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleWishlist,
} from "../controllers/propertyController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);

// Private routes (Admin only)
router.post("/", protect, adminOnly, upload.array("images", 10), createProperty);
router.put("/:id", protect, adminOnly, updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);

// Private routes (User)
router.put("/:id/wishlist", protect, toggleWishlist);

export default router;