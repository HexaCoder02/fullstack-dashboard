const Task = require("../models/Task");

// GET tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
};

// CREATE task
exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user
  });
  res.status(201).json(task);
};

// DELETE task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
