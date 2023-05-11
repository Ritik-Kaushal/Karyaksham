const express = require("express");
const Category = require("../models/category");
const User = require("../models/user");
const { verifyToken } = require("../middlewares.js/verifyToken");
const { mongoose } = require("mongoose");

const router = express.Router();

router.get("/get",  async (req, res) => {
  try {
    const { user } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json(["User not found"]);
    }

    // Retrieve category names of the user
    const categoryNames = await Category.find(
      {
        user: existingUser._id,
      },
      "name"
    );
    res.status(200).json(categoryNames);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Internal server error"]);
  }
});

router.post("/add",  async (req, res) => {
  try {
    const { title, user } = req.body;
    console.log(req.body);

    // Check if the user exists
    const existingUser = await User.findOne({
      $or: [{ _id: user }, { username: user }],
    });
    if (!existingUser) {
      return res.status(404).json(["User not found"]);
    }

    // Create the category
    const category = new Category({ name: title, user: existingUser._id });
    await category.save();

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    var error = ["Internal server error"];
    if (err.code === 11000) {
      error = ["Category with this title already exists."];
    } else {
      error = err.message.split("Category validation failed: ")[1].split(", ");
    }
    res.status(500).send(error);
  }
});

router.put("/update/:category_id",  async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const { user, new_title } = req.body;

    // Check if the category ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check if the category exists
    const existingCategory = await Category.findById(category_id);
    if (!existingCategory) {
      return res.status(404).json(["Category not found"]);
    }

    // Check if the user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json(["User not found"]);
    }

    // Check if the user is authorized to update the category
    if (existingCategory.user.toString() !== user._id) {
      return res
        .status(400)
        .json(["User is not authorized to update this category"]);
    }

    // Update the category name
    existingCategory.name = new_title;
    await existingCategory.save();

    res.status(200).json(["Category name updated successfully"]);
  } catch (err) {
    console.log(err);
    var error = ["Internal server error"];
    if (err.code === 11000) {
      error = ["Category with this title already exists."];
    } else {
      error = err.message.split("Category validation failed: ")[1].split(", ");
    }
    res.status(500).send(error);
  }
});

// Delete category
router.delete("/delete/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const { user } = req.body;

    // Check if the category ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check if the category exists
    const existingCategory = await Category.findById(category_id);
    if (!existingCategory) {
      return res.status(404).json(["Category not found"]);
    }

    // Check if the user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json(["User not found"]);
    }

    // Check if the user is authorized to delete the category
    if (existingCategory.user.toString() !== user._id) {
      return res
        .status(400)
        .json(["User is not authorized to delete this category"]);
    }

    // Delete the category
    await Category.deleteOne({ _id: category_id });

    res.status(200).json(["Category deleted successfully"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Internal server error"]);
  }
});

module.exports = router;
