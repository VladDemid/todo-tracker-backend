import "colors";
import morgan from "morgan";

import express from "express";

import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import todosRoutes from "./app/todos/todos.routes.js";
import cors from "cors";
import { prisma } from "./prisma/prisma.js";

// const prisma = new PrismaClient();
const app = express();

async function main() {
  if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));
  console.log("____________________________________");

  const PORT = process.env.PORT || 5000;
  const allowedOrigins = [
    "http://localhost:3006",
    "http://localhost:3000",
    "http://localhost:4173",
  ];

  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/todos", todosRoutes);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`.green.bold);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
