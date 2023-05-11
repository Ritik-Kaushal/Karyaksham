const mongoose = require("mongoose");
const Category = require("./category");
const moment = require("moment");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required."],
      validate: {
        validator: async function (value) {
          const count = await mongoose.models.Task.countDocuments({
            name: value,
            user: this.user,
          });
          console.log(this.user);
          return count === 0;
        },
        message: "Task title must be unique for each user",
      },
    },
    description: {
      type: String,
      required: [true, "Task description is required."],
    },
    deadline: {
      type: Date,
      required: [true, "Task deadline is required."],
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }
        // If the parsed date is invalid, return the original value
        else {
          // throw new Error({ message:"Task validation failed: deadline: Invalid date format" });
          throw new Error("Task validation failed: deadline: Invalid date format");
        }
      },
      get: function (value) {
        // Format the Date object to the specified format
        const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
        return date;
      },

      validate: [
        {
          validator: function (value) {
            const currentDate = new Date();
            return value > currentDate;
          },
          message: "Deadline must be in the future",
        },
      ],
    },
    completedAt: {
      type: Date,
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }

        // If the parsed date is invalid, return the original value
        else throw new Error("Invalid date format");
      },
      get: function (value) {
        var date=value;
        if(value){
          // Format the Date object t o the specified format
          const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
          console.log(date);
        }
        // console.log(value);
       
        return date;
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Reference to Category is required."],
      validate: {
        validator: async function (value) {
          const categoryCount = await mongoose.models.Category.countDocuments({
            _id: value,
          });
          return categoryCount > 0;
        },
        message: "Invalid category",
      },
    },
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
  },
  { toJSON: { getters: true } }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
