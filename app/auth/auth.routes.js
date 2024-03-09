import express from "express";

import {
  authUser,
  registerUser,
  testGet,
  testPost,
} from "./auth.controller.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/registration").post(registerUser);
router.route("/test").get(testGet).post(testPost);

export default router;
