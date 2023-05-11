const mongoose = require("mongoose");
const Task = require("./task");
const User = require("./user");

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        const userCount = await mongoose.models.User.countDocuments({
          _id: value,
        });
        return userCount > 0;
      },
      message: "Invalid user",
    },
  },
  name: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (value) {
          return /^[a-zA-Z0-9\s]+$/.test(value);
        },
        message: "Category name can only contain letters and/or numbers",
      },
      {
        validator: async function (value) {
          const count = await mongoose.models.Category.countDocuments({
            name: value,
            user: this.user,
          });
          return count === 0;
        },
        message: "Category title must be unique for each user",
      },
    ],
  },
});

categorySchema.pre("remove", async function (next) {
  const categoryId = this._id;

  // Delete all tasks associated with the category
  await Task.deleteMany({ category: categoryId });

  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
