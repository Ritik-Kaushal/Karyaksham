const express = require("express");
const Category = require("../models/category");
const User = require("../models/user");
const Task = require("../models/task");
const { verifyToken } = require("../middlewares.js/verifyToken");
const { mongoose } = require("mongoose");
const moment = require("moment");

const router = express.Router();

// Create a task
router.post("/add", async (req, res) => {
  try {
    const { user, category, title, description, deadline } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json(["User not found"]);
    }

    // Check if the category exists
    const existingCategory = await Category.findOne({
      name: category,
      user: user,
    });
    if (!existingCategory) {
      return res.status(404).json(["Category not found"]);
    }

    // Create the task
    const newTask = new Task({
      user: user,
      category: existingCategory._id,
      name: title,
      description: description,
      deadline: deadline,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    // console.log(err);
    var error = "";
    if (err.code === 11000) {
      error = ["Category with this title already exists."];
    } else {
      error = err.message.split("Task validation failed: ")[1].split(", ");
    }
    res.status(500).send(error);
  }
});

//  Get task of a particular category
router.get("/get/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const { user } = req.body;

  try {
    // Find the category based on the provided category name
    const category = await Category.findOne({
      name: categoryName,
      user: user._id,
    });

    if (!category) {
      return res.status(404).json(["Category not found"]);
    }

    // Find all tasks associated with the category
    const tasks = await Task.find({ category: category._id });
    res.status(200).json(tasks);
  } catch (error) {
    // console.log(error);
    res.status(500).json(["Internal server error"]);
  }
});

//  Update a particular task
router.put("/update/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, deadline, user } = req.body;

    // Check if the category ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(task_id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    await Task.updateOne(
      { _id: task_id, user: user._id },
      { name: title, description: description, deadline: deadline },
      { runValidators: true }
    );

    const task = await Task.findOne({ _id: task_id, user: user._id });
    if (!task) {
      return res.status(404).json(["Task not found"]);
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    console.log(err);
    var error = ["Internal server error"];
    if (err.code === 11000) {
      error = ["Task with this title already exists."];
    } else {
      error = err.message.split("Validation failed: ")[1].split(", ");
    }
    res.status(500).send(error);
  }
});

// Delete a particular task
router.delete("/delete/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { user } = req.body;

    // Check if the category ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(task_id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findOne({ _id: task_id, user: user._id });
    if (!task) {
      return res.status(404).json(["Task not found"]);
    } else {
      // Delete the task
      await Task.deleteOne({ _id: task._id });
      res.status(200).json(["Task deleted successfully"]);
    }
  } catch (err) {
    res.status(500).json(["Internal server error"]);
  }
});

module.exports = router;
