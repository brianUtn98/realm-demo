import { Router } from "express";
import realm from "../realm";

const router = Router();

router.get("/tasks", async (req, res) => {
  const tasks = (await realm).objects("Task");

  res.json({ tasks: tasks.toJSON() });
});

router.post("/tasks", async (req, res) => {
  const realmClient = await realm;

  realmClient.beginTransaction();

  const newTask = realmClient.create("Task", req.body);

  realmClient.commitTransaction();

  res.json(newTask.toJSON());
});

export default router;
