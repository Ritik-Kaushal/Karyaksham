const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateLoginToken } = require("../utils/generateToken");
const { verifyToken } = require("../middlewares.js/verifyToken");


router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    if (password === confirm_password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SECRET_PASSWORD_SALT_NUMBER)
      );
      const user = await new User({
        username: username,
        email: email,
        password: hashedPassword,
      }).save();
      res.send(user);
    } else {
      res.status(400).send(["Password and Confirm Password must match"]);
    }
  } catch (err) {
    var error = "";
    if (err.code === 11000) {
      error = ["User with this email already exists."];
    } else {
      error = err.message.split("user validation failed: ")[1].split(", ");
    }
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login_id, password } = req.body;
    if (login_id) {
      if (password) {
        let user;
        if (
          login_id.includes("@") &&
          login_id.includes(".", login_id.indexOf("@"))
        ) {
          user = await User.findOne(
            { email: login_id },
            "username password"
          ).exec();
        } else {
          user = await User.findOne(
            { username: login_id },
            "username password"
          ).exec();
        }
        if (user) {
          if (!user.confirmed_email) {
            const valid = await bcrypt.compare(password, user.password);

            if (valid) {
              const token = generateLoginToken(user._id, user.username);
              res.status(200).send({
                token: token,
                username: user.username,
              });
            } else {
              res.status(400).send(["Incorrect Password."]);
            }
          } else {
            res.status(400).send(["Please confirm your email before login."]);
          }
        } else {
          res.status(400).send(["Invalid Username or email."]);
        }
      } else {
        res.status(400).send(["Password is required."]);
      }
    } else {
      res.status(400).send(["Username or email is required."]);
    }
  } catch (error) {
    res.status(500).send(["Something went wrong."]);
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  res
    .status(200)
    .send({username: req.body.user.username});
});

module.exports = router;
