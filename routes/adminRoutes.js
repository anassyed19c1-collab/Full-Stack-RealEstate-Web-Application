import express from "express";
import {
  getAllUsers,
  deleteUser,
  toggleBanUser,
  getDashboardStats,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Saare admin routes pe protect + adminOnly middleware lagao
router.use(protect, adminOnly);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/ban", toggleBanUser);

// Stats
router.get("/stats", getDashboardStats);

export default router;