// ------------- Imports --------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = express();

const auth = require("./routes/auth");
const category = require("./routes/category");
const task = require("./routes/task");

const User = require("./models/user");
const Category = require("./models/category");
const Task = require("./models/task");
const { verifyToken } = require("./middlewares.js/verifyToken");


// ------------- Middlewares --------------
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use("/auth",auth);
app.use("/category",verifyToken, category);
app.use("/task",verifyToken ,task);


// ------------- database connection and starting the server --------------
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });

