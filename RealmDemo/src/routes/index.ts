import { Router } from "express";
import realm from "../realm";
import User from "../models/User";
import Task from "../models/Task";

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

router.get("/tasks/q", async (req, res) => {
  const { filter } = req.query;

  try {
    const [field, operator, ...value] = `${filter?.toString()}`
      .replace(/"/g, "")
      .split(" ");

    const replace: any = isNaN(Number(value)) ? value.join(" ") : Number(value);

    const tasks = (await realm)
      .objects("Task")
      .filtered(`${field} ${operator} $0`, replace);

    res.json({ tasks: tasks.toJSON() });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ error: "Syntax error in the filter" });
  }
});

router.get("/users", async (req, res) => {
  const users = (await realm).objects("User");

  res.json({ users: users.toJSON() });
});

router.post("/users", async (req, res) => {
  const realmClient = await realm;

  realmClient.beginTransaction();

  const newUser = realmClient.create("User", req.body);

  realmClient.commitTransaction();

  res.json(newUser.toJSON());
});

router.post("/users/:id/tasks", async (req, res) => {
  const { id } = req.params;

  const realmClient = await realm;

  const user = realmClient.objectForPrimaryKey(
    User,
    new Realm.BSON.ObjectID(id)
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  realmClient.write(() => {
    const newTask = realmClient.create(Task, req.body);

    user.tasks.push(newTask);
  });

  res.json({ user: user.toJSON() });
});

export default router;
