import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createCategory, getCategory } from "../controllers/categories.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createCategory);

// READ
router.get("/", getCategory);

export default router;