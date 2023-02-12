import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost,
         updatePost,
         deletePost,
         getPost,
         getAllPosts,
         likePost
        } from "../controllers/posts.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createPost);

//UPDATE POST
router.put("/:id", verifyToken, updatePost);

//DELETE POST
router.delete("/:id", verifyToken, deletePost)

//GET POST
router.get("/:id", getPost);

//GET ALL POSTS
router.get("/", getAllPosts);

// LIKE POST
router.patch("/:id/like", verifyToken, likePost);

export default router;