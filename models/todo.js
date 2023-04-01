const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [todoSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
