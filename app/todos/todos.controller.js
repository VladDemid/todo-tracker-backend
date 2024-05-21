import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma/prisma.js";

// export const getUserTodos = asyncHandler(async (req, res) => {
//   const todos = ["test"];

//   res.json(todos);
// });

export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({}).status(204);
    // res.status(204);
  } catch (error) {
    res.status(404);
    throw new Error("Todo not found!");
  }
});

export const createTodo = asyncHandler(async (req, res) => {
  const { title, duration, theme, comment, ["no timer"]: no_timer } = req.body;

  const todo = await prisma.todo.create({
    data: {
      title,
      duration: +duration,
      no_timer,
      theme,
      comment,
      date: new Date(),
      author_id: +res.locals.user?.id,
    },
  });

  res.json(todo);
});

export const toggleTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await prisma.todo.update({
      where: {
        id: +req.params.id,
      },
      data: {
        is_done: !req.body.is_done,
      },
    });

    console.log(todo);

    res.json(todo).status(200);
  } catch (error) {
    res.status(404);
    throw new Error("Todo not found!");
  }
});
