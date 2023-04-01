const express = require("express");
const router = express.Router();
const User = require("../models/todo");

// Create User endpoint
router.post("/users/:username", async (req, res) => {
  const username = req.params.username;
  console.log;
  if (!username) {
    return res
      .status(404)
      .json({ error: "invalid route, verify the endpoint" });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({
      username,
      todos: [{ label: "created user", done: false }],
    });

    const newUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User endpoint
router.put("/users/:username", async (req, res) => {
  const username = req.params.username;
  const todos = req.body;
  console.log(todos);
  if (!username) {
    return res
      .status(404)
      .json({ error: "invalid route, verify the endpoint" });
  }
  try {
    // Find the user
    let error;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // verify if user.todos is an array
    // verify if each item from the array has a label and a done properties only

    if (!Array.isArray(todos) || todos.length === 0) {
      return res
        .status(400)
        .json({ error: "todos must be an array and it can;t be empty" });
    }

    todos.forEach((todo) => {
      if (!todo.label || !todo.done) {
        error = {
          status: 400,
          message: "todos must have a label and a done property",
        };
      } else if (
        typeof todo.done !== "boolean" ||
        typeof todo.label !== "string"
      ) {
        error = {
          status: 400,
          message: "done must be a boolean & label must be a string",
        };
      }
    });
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    // Update the todos array
    user.todos = todos;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User's Todos endpoint
router.get("/users/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res
      .status(404)
      .json({ error: "invalid route, verify the endpoint" });
  }
  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete User endpoint
router.delete("/users/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res
      .status(404)
      .json({ error: "invalid route, verify the endpoint" });
  }
  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user and all its todos
    await user.remove();

    res.json({ message: "User and all its todos deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
