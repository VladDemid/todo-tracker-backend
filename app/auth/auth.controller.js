import asyncHandler from "express-async-handler";
import { hash, verify } from "argon2";

import { generateToken } from "./jwt-generator.js";
import { UserFields, exclude } from "../utils/prisma-utils.js";
import { prisma } from "../../prisma/prisma.js";

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const todos = await prisma.todo.findMany({
    where: {
      author_id: user?.id,
    },
    orderBy: {
      id: "asc",
    },
  });

  // console.log(`user.password:${user.password}, password: ${password}`)
  const isValidPassword = user ? await verify(user.password, password) : false;
  console.log("isValidPassword:" + isValidPassword);

  if (user && isValidPassword) {
    const token = generateToken(user.id);
    const userData = exclude(user, ["password", "created_at", "updated_at"]);
    res.json({ userData, token, todos });
  } else {
    res.status(404).send("User not found");
    // res.json({ message: "User not found" });
    throw new Error("Email and password are not correct");
  }

  // res.json(user)
  // res.json({message: 'You are authorized'})
});

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  const isHaveUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isHaveUser) {
    res.status(409).send("This email address is already registered");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hash(password),
    },
    select: UserFields,
  });

  const token = generateToken(user.id);
  res.json({ user, token });
});

export const testPost = asyncHandler(async (req, res) => {
  res.status(200);
  res.send("successful");
});

export const testGet = asyncHandler((req, res) => {
  res.send("Hello World!");
});
