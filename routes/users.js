import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { updateUser, deleteUser, getUser } from "../controllers/users.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, updateUser);

// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET USER
router.get("/:id", verifyToken, getUser);

export default router