import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import { toggleTodo, createTodo, deleteTodo } from "./todos.controller.js";

const router = express.Router();

router.route("/").post(protect, createTodo);
router.route("/:id").patch(protect, toggleTodo);
router.route("/:id").delete(protect, deleteTodo);

export default router;
