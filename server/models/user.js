const mongoose = require("mongoose");
const Category = require("./category");
const Task = require("./task");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: [true, "User with this username already exists."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "User with this email already exists."],
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  confirmed_at: {
    type: Date,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid Date.",
    },
  },
});

userSchema.pre("remove", async function (next) {
  const userId = this._id;

  // Delete all categories and tasks associated with the user
  await Category.deleteMany({ user: userId });
  await Task.deleteMany({
    category: { $in: await Category.find({ user: userId }).distinct("_id") },
  });

  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
