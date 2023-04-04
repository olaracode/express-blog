const User = require("./users.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../auth/AuthMiddleware.js");
const saltRounds = 10;

router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    email,
    password: hashedPassword,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userExists);
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const token = generateAccessToken(email);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
