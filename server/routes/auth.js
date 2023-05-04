const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);

    const user = await new User({
      name: name,
      email: email,
    }).save();

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
