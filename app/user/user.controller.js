import asyncHandler from "express-async-handler";

import { prisma } from "../../prisma/prisma.js";
import { UserFields, exclude } from "../utils/prisma-utils.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: UserFields,
  });

  const todos = await prisma.todo.findMany({
    where: {
      author_id: res.locals.user?.id,
    },
    orderBy: {
      id: "desc",
    },
  });

  const userData = exclude(user, ["password", "created_at", "updated_at"]);

  res.json({ userData, todos });
});
